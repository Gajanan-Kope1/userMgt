const password_regx=[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*+-_=])[a-zA-Z0-9!@#$%&*+-_=]{8,16}$/, "g"];
const val = require("./validator");
const srvUsr = require("../../services/userService");

let conditions = {
	email:{
		...val.groupExistTrimNotEmpty("email"),
		isEmail:{
			errorMessage: "Please enter valid email"
		},
		normalizeEmail:true,
		custom: {
			options: async (value, { req, location, path }) => { // eslint-disable-line
				let cond = { "email": value };
				if (typeof (req.body.user_id) != "undefined" && req.body.user_id != "") {
					cond._id = { $ne: req.body.user_id };
				}
				const result = await srvUsr.getUserByConditionCount(cond);
				if (result.status == 200 && result.data)
					throw new Error("email already register");
			}
		}
	},
	phone:{
		...val.groupExistTrimNotEmpty("phone"),
		custom: {
			options: async (value, { req, location, path }) => { // eslint-disable-line
				let cond = {"phone":value};
				if(typeof(req.body.user_id)!="undefined" && req.body.user_id !=""){
					cond._id = {$ne:req.body.user_id};
				}
				const result = await srvUsr.getUserByConditionCount(cond);
				if (result.status == 200 && result.data)
					throw new Error("phone already register");
			}
		}
	},
	user_id:{
		...val.groupExistTrimNotEmpty("user_id"),
		custom: {
			options: async (value, { req, location, path }) => { // eslint-disable-line
				const result = await srvUsr.getUserByConditionCount({_id:value});
				if(result.status != 200 || !result.data)
					throw new Error("User does not exists");
			}
		}
	},
};

/**
* This Function that Verify the valid User Signup.
*/
exports.valUserSignup = (req, res, next) => {
	const schema = {
		f_name						: val.groupExistTrimNotEmpty("First name"),
		l_name						: val.groupExistTrimNotEmpty("Last name"),
		email						: conditions.email,
		phone						: conditions.phone,
	};

	val.validateSchema(req, res, next,schema);
};

/**
* This Function that Verify the valid User login.
*/
exports.valUserLogin = (req, res, next) => {

	const schema = {
		email:val.groupExistNotEmpty("email"),
		password: val.groupExistTrimNotEmpty("password"),
		device_id: val.groupExistTrimNotEmpty("device_id")
	};

	val.validateSchema(req, res, next,schema);
};

/**
* This Function that Verify the valid User Data.
*/
exports.valUserProfileUpdate = (req, res, next) => {

	const schema = {
		user_id:conditions.user_id,
		f_name:val.groupExistTrimNotEmpty("First name"),
		l_name:val.groupExistTrimNotEmpty("Last name"),
		phone:conditions.phone,
	};

	val.validateSchema(req, res, next,schema);
};