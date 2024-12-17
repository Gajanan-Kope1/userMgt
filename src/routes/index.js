const aut = require("../app/middleware/auth/auth");
module.exports = function (app,router) {

    require("./commonRoute")(router,aut);
    require("./userRoute")(router,aut);
    require("./uploadRoute")(router,aut);

	app.use("",router);
    app.use("/*",(req,res) => {
	    res.status(200).json({status:200,msg:"Not Found",data:null});
    });
};