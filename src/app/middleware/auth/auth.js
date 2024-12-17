const jwt = require("jsonwebtoken");
const srvUsr = require("../../services/userService");

exports.verifyToken = async (req, res, next) => {
	try{
		const req_context_method = req?.requestContext?.http?.method ?? req.method;
		const req_context_path = req?.requestContext?.http?.path ?? req.originalUrl;
		const rout_url = (((req_context_method+req_context_path).toLowerCase()).split("?"))[0];
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		const id = decodedToken.user_id;

		let result = await srvUsr.getUserByCondition({"_id":id,"auth_token":{$elemMatch:{"token":token}}},{});

		if(result.status == 200 && result.data){
			req.user_id = id;
			next();
		}
		else
			res.status(401).json({status:401,msg:"Invalid Token!",data:null});
        
	} catch(err) {
		console.log(err.message);
		res.status(401).json({status:401,msg:"Valid token require",data:null});
	}    
};

/**
* This Function that update the token and token allows you to verify that the content hasn't been tampered with.
*/

exports.genToken = async (data) => {
	try {
        
		let token_expire = "7d";
		let token = jwt.sign(data, process.env.TOKEN_SECRET,{expiresIn:token_expire});
		let device_id = data.device_id;
        
		let id = data.user_id;

		//clear_old_token
		await srvUsr.updateUserByCondition({"_id":id},{$pull: {auth_token:{token:{$exists: true},device_id:device_id}}});
		let result = await srvUsr.updateUserByCondition({"_id":id},{ $push:{"auth_token":{"token":token,"device_id":device_id}}});
		if (result.status == 200) {
			return { status: true, msg: "success", token: token };
		}
		else {
			throw new Error("Unable to generate token, Please try again!");
		}

	} catch(err) {
		return {status:false,err_msg:err.toString()};
	}
};

/**
* This Function use to verify correct App key & App seccrete for API calls
*/
const verifyKeysFun = (req) => {
	try{
		const api_key = req.headers.api_key;
		const api_secrete = req.headers.api_secrete;
        
		if(api_key==process.env.API_KEY && api_secrete==process.env.API_SECRETE){
			return {status:200,msg:"sucess",data:null};
		}
		else
			return {status:401,msg:"Please provide valid api key & secrete",data:null};

	} catch(err) {
		return {status:401,msg:"Valid api key & secrete require",data:err};
	}
};

exports.verifyKeys = (app) => {
	app.use((req, res, next) => { // check default functions before call to route
		const verifyKeysResult = verifyKeysFun(req);
		if(verifyKeysResult.status!=200){
			res.status(verifyKeysResult.status).json(verifyKeysResult);
		}
		else
			next();
	});
};

