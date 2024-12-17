const MongoObjectID = require("mongoose").Types.ObjectId;

/**
* Function that get Model
* @return This model function that get Model list.
*/
exports.getModel = async (model,one_result=false,cond={},proj={},sort={_id:-1},skip=0,limit=10) => {
	try{
		let result = {};
		if(Object.prototype.hasOwnProperty.call(cond,"_id")){
			if(Object.prototype.hasOwnProperty.call(cond._id,"$ne")){
				cond._id.$ne = new MongoObjectID(cond._id.$ne);
			}
			else{
				cond._id = new MongoObjectID(cond._id);
			}
		}
		if(one_result)
			result = await model.findOne(cond).select(proj);
		else
			result = await model.find(cond).select(proj).sort(sort).skip(skip).limit(limit);
		
		if(result && (one_result || result.length > 0))
			return {status:200,msg:"Data Found",data:result};
		else
			return {status:200,msg:"Data Not Found",data:null};
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

/**
* Function that Get Model.
* @return This model function that get Model with the condition count.
*/
exports.getCountModel = async (model,cond={}) => {
	try{
		if(Object.prototype.hasOwnProperty.call(cond,"_id")){
			if(Object.prototype.hasOwnProperty.call(cond._id,"$ne")){
				cond._id.$ne = new MongoObjectID(cond._id.$ne);
			}
			else if(Object.prototype.hasOwnProperty.call(cond._id,"$in")){
				for(let x in cond._id.$in){
					cond._id.$in[x] = new MongoObjectID(cond._id.$in[x]);
				}
			}
			else
				cond._id = new MongoObjectID(cond._id);
		}
		let result = await model.countDocuments(cond);
		if(result!=null && result > 0)
			return {status:200,msg:"Data Found",data:result};
		else
			return {status:200,msg:"Data Not Found",data:null};
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

/**
* Function that Add Model.
* @return This model function that Add Model.
*/
exports.addModel = async (model,title="",data) => {
	try{
		await model(data).save();
		return {status:200,msg: title+" Added Successfully",data:null};
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};

/**
* Function that update Model.
* @return This model function that update Model by ID.
*/
exports.updtModel = async (model,title="",cond={},data={}) => {
	try{
		if(Object.prototype.hasOwnProperty.call(cond,"_id")){
			cond._id = new MongoObjectID(cond._id);
		}
		else if(Object.prototype.hasOwnProperty.call(data,"id")){
			cond = {_id:new MongoObjectID(data.id)};
		}
		delete data.id;
		await model.updateOne(cond,data);
		return {status:200,msg:title+" Updated Successfully",data:null};
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};