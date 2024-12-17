const Upload = require("../models/uploadModel");
const srvDB = require("./dbService");
const title = "Video";

/**
* Function that upload Video.
* @return This model function that upload video.
*/
exports.uploadVideo = async (body) => {
	try {
		return await srvDB.addModel(Upload,title,body);
	}
	catch (err) {
		return { status: 400, msg: "Error", data: err.toString() };
	}
};

/**
* Function that Get videos.
* @return This model function that get videos list with the Count ID.
*/
exports.getVideosByUser = async (cond,projects={},sort,skip,limit) => {
	try{
		return await srvDB.getModel(Upload,false,cond,projects,sort,skip,limit);
	}
	catch (err) {
		return {status:400,msg:"Error",data:err.toString()};
	}
};
