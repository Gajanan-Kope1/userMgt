const hprFlpUpl = require("../app/helper/file_upload");
const ctrCmn = require("../app/controllers/commonController");

module.exports = function (router,aut) {

	router.post("/commonRoute/fileUpload",hprFlpUpl.upload.array("files",1),hprFlpUpl.fileValidation,ctrCmn.fileUpload);

};