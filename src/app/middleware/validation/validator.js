const expVal = require("express-validator");

exports.validateSchema = async (req, res, next, schema) => {
	await expVal.checkSchema(schema).run(req);

	const errorFormatter = ({ location, msg, param, value, nestedErrors }) => { // eslint-disable-line
		return `${msg}`;
	};
	
	const errors = await expVal.validationResult(req).formatWith(errorFormatter);
	if (errors.isEmpty()) {
		next();
	}
	else
	{
		var msg = errors.array({ onlyFirstError: true }).join(", ");
		res.status(400).json({status:400,msg:msg,data:null});
	}
};

exports.groupExistTrimNotEmpty = (field) => {
	return {
		exists: {
			errorMessage: `${field} must required`
		},
		trim: true,
		notEmpty: {
			errorMessage: `${field} should not be empty`,
		}
	};
};

exports.groupExistNotEmpty = (field) => {
	return {
		exists: {
			errorMessage: `${field} must required`
		},
		notEmpty: {
			errorMessage: `${field} should not be empty`,
		}
	};
};