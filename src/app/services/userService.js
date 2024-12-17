const User = require("../models/userModel");
const srvDB = require("./dbService");
const title = "User";

/**
* Function that Users Signup.
* @return This model function that register the users.
*/
exports.createUser = async (body) => {
	try {
		return await srvDB.addModel(User,title,body);
	}
	catch (err) {
		return { status: 400, msg: "Error", data: err.toString() };
	}
};

/**
* Function that Get Users.
* @return This model function that get Users list with the Count ID.
*/
exports.getUserByCondition = async (cond,projects={}) => {
	try{
		return await srvDB.getModel(User,true,cond,projects);
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

/**
* Function that update Users.
* @return This model function that update Users by condition.
*/
exports.updateUserByCondition = async (cond,data) => {
	try{
		return await srvDB.updtModel(User,title,cond,data);
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

/**
* Function that Get Users.
* @return This model function that get Users with the condition count.
*/
exports.getUserByConditionCount = async (cond) => {
	try{
		return await srvDB.getCountModel(User,cond);
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

// 

/**
* Function that Get Users.
* @return This model function that get Users.
*/
exports.getUserList = async (cond,projects={},sort,skip,limit) => {
	try{
		let result = await User.aggregate([
			{
				$skip: skip,
			},
			{
				$limit: limit,
			},
			{
				$lookup: {
					from: 'uploads',
				  	localField: '_id',
				  	foreignField: 'userId',
				  	as: 'uploads',
				},
			},
			{
				$addFields: {
				 	uploads: { $slice: ['$uploads', 5] },
				},
			},
		]);

		if(result && result[0]){
			return {status:200,msg:"success",data:result};
		}else{
			return {status:200,msg:"Data not found",data:null};
		}
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};