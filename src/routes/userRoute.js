const ctrUsr = require("../app/controllers/userController");
const valUsr = require("../app/middleware/validation/userValidate");

module.exports = function (router,aut) {
	
	router.post("/user/signup",valUsr.valUserSignup,ctrUsr.userSignup);
	router.post("/user/login",valUsr.valUserLogin,ctrUsr.userLogin);
	router.get("/user/profile",aut.verifyToken,ctrUsr.userProfile);
	router.put("/user/profile",aut.verifyToken,valUsr.valUserProfileUpdate,ctrUsr.userUpdateProfile)

	router.get("/user/list",ctrUsr.getUserList);
};