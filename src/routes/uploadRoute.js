const ctrUpld = require("../app/controllers/uploadController");
const valUpld = require("../app/middleware/validation/uploadValidate");

module.exports = function (router,aut) {
    
    router.post("/video/upload",aut.verifyToken,valUpld.valUploadVideo,ctrUpld.uploadVideo);
    router.get("/video/list",ctrUpld.getVideosByUser);
};