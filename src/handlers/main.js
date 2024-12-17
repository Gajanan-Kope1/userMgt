const express = require("express");
const path = require("path")
const app = express();
const router = express.Router();

app.use(express.json()); // Get Raw data from post API
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.join(__dirname, '../../files')));

app.use((err, req, res, next) => { // body parser error catcher
	if (err instanceof SyntaxError) {
		res.status(400).json({status:400,msg:"Invalid Data send",data:null});
	}else {
		next();
	}
});

require("dotenv").config(); // remove when to work on serverless
require("../config/cors")(app);
require("../app/middleware/auth/auth").verifyKeys(app); // Verify API Keys
require("../config/db_connect"); // DB connection initialization
require("../routes")(app,router); // All routes 

app.listen(7000,(err) => {
	if(!err) {
		console.log("server running on 7000");
	}
	else {
		console.log("Error while running the server!");
	}
});