const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT, // SMTP PORT
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

exports.sendSimpleEmail = async (to_id,email_data,email_subject) => {
    
	let mailOptions = {
		from: process.env.MAIL_FROM,
		to: to_id,
		subject: email_subject,
		// text: 'test',
		html: email_data
	};

	var emailProm = new Promise(function(resolve, reject){
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			else{
				resolve(info);
			}
		});
	})
		.then(function(result){ // eslint-disable-line
			// Success so do something with result
			console.log("Success:", result.response)
		})
		.catch(function(err){ // eslint-disable-line
			// Handle error
			console.log("Error: ", err);
		});

	return emailProm;
};
