const bcrypt = require("bcryptjs");

exports.hashPassword = async (plain_text_password) => {
	try{
		let saltRounds = parseInt(process.env.SALTROUNDS);
		let salt = await bcrypt.genSalt(saltRounds);
		let hash_password = await bcrypt.hash(plain_text_password, salt);
		return {status:true,msg:"success",hash_password:hash_password};
	} catch(err) {
		return {status:false,err_msg:err.toString()};
	}
};

exports.checkPassword = async (plain_text_password,hash_password) => {
	try{
		let check_password = await bcrypt.compare(plain_text_password, hash_password);
		if(check_password)
			return {status:true,msg:"password matched"};
		else
			return {status:false,msg:"password not matched"};
	} catch(err) {
		return {status:false,err_msg:err.toString()};
	}
};	

