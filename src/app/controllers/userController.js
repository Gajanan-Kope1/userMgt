const aut = require("../middleware/auth/auth");
const srvUsr = require("../services/userService");
const resEmailTemp = require("../resources/email_templates/register");
const hprPas = require("../helper/password_op");
const hprEml = require("../helper/email");
const hprCmn = require("../helper/common");

/**
* Function that register user
* @param create register user. 
* @return
*/
exports.userSignup = async (req, res) => {
	let password = req.body.f_name.slice(0, 3) + "!@#$%^&*"[Math.floor(Math.random() * 8)] + req.body.l_name.slice(0, 3) + Math.floor(Math.random() * 100) + req.body.phone.slice(-4);
	let res_hash_password = await hprPas.hashPassword(password);
	req.body.password = res_hash_password.hash_password;
	const result = await srvUsr.createUser(req.body);
	if(result.status == 200){
		let regEmailTemp = await resEmailTemp.emailData({f_name:req.body.f_name,l_name:req.body.l_name,email:req.body.email,password:password})
		await hprEml.sendSimpleEmail(req.body.email,regEmailTemp,"Welcome!")
	}
	res.status(result.status).json(result);
};

/**
* Function that login user
* @param login register user. 
* @return
*/
exports.userLogin = async (req,res) => {

	//below condition check if value in username parameter from request is match with username,phone or email fields
	let $cond = {"$and":[
		{"email":req.body.email},
		{"email": {$nin: ["", null]}}
	]};

	const result = await srvUsr.getUserByCondition($cond,{});

	if(result.status==200 && result.data)
	{
		let res_check_password = await hprPas.checkPassword(req.body.password,result.data.password);
		let $check_pass = res_check_password.status;

		if($check_pass)
		{
			let id = result.data._id.toString();
			let token_res =  await aut.genToken({user_id:id,device_id:req.body.device_id});
			if(token_res.status)
			{
				result.data = result.data.toJSON();
				delete result.data.password;
				result.data.auth_token=undefined;
				result.msg = "Logged in Successfully";
				result.data.auth_token = token_res.token;
				
				res.status(result.status).json(result);
			}
			else{
				res.status(500).json({status:500,msg:token_res.err_msg,data:null});
			}
		}
		else
		{
			res.status(400).json({status:400,msg:"Please enter valid credentials",data:null});
		}
	}
	else
	{
		result.status = 400;
		result.msg = "Please enter valid credentials";
		res.status(result.status).json(result);
	}
};

/**
* Function that get Users detail.
* @param Get the User detail.
* @return
*/
exports.userProfile = async (req, res) => {
	const result = await srvUsr.getUserByCondition({ _id: req.user_id }, {});
	res.status(result.status).json(result);
};

exports.userUpdateProfile = async (req,res) =>{
	try {
		if (req.body.bio && req.body.bio.trim().split(/\s+/).length > 500) {
            throw {message: "bio cannot exceed 500 words."}
        }

		const updateData = {
			"f_name"		: req.body.f_name,
			"l_name"		: req.body.l_name,
			"phone"			: req.body.phone,
			"logo"			: req.body.logo,
			"bio"			: req.body.bio,
		};

		const result = await srvUsr.updateUserByCondition({_id:req.body.user_id},updateData);
		if(result.status==200){
			result.msg = "Profile Updated Successfully";
		}
		res.status(result.status).json(result);
		
	} catch (err) {
		res.status(400).json({status:400,msg:err.message,data:null});
	}
};


//
/**
* Function that user list.
* @param Get the users
* @return
*/
exports.getUserList = async (req, res) => {
    const skip = hprCmn.getPagignationSkip(req.query);
	const limit = hprCmn.getPagignationLimit(req.query);
	const sort = {created_at:-1};
    const result = await srvUsr.getUserList({},{},sort,skip,limit);
    res.status(result.status).json(result);
};
