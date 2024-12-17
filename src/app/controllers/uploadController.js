const srvUpld = require("../services/uploadService");
const hprCmn = require("../helper/common");


/**
* Function that Upload Video
* @param Upload video. 
* @return
*/
exports.uploadVideo = async (req, res) => {
    req.body.userId = req.user_id;
    const result = await srvUpld.uploadVideo(req.body);
    res.status(result.status).json(result);
};

/**
* Function that get videos.
* @param Get the videos
* @return
*/
exports.getVideosByUser = async (req, res) => {
    let cond = {};
    if(req.query.userId){
        cond.userId = req.query.userId
    }
    const skip = hprCmn.getPagignationSkip(req.query);
	const limit = hprCmn.getPagignationLimit(req.query);
	const sort = {created_at:-1};
    const result = await srvUpld.getVideosByUser(cond,{},sort,skip,limit);
    res.status(result.status).json(result);
};
