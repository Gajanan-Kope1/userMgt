const val = require("./validator");

let conditions = {
    title :{
        ...val.groupExistTrimNotEmpty("title"),
        custom: {
            options: (value) => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 30; // Limit to 30 words
            },
            errorMessage: "Title cannot exceed 30 words.",
        },
    },
    desc:{
        ...val.groupExistTrimNotEmpty("description"),
        custom: {
            options: (value) => {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 120; // Limit to 120 words
            },
            errorMessage: "Description cannot exceed 120 words.",
        },
    }
}

exports.valUploadVideo = (req, res, next) => {
	const schema = {
		title						: conditions.title,
		desc						: conditions.desc,
		video						: val.groupExistTrimNotEmpty("video"),
	};

	val.validateSchema(req, res, next,schema);
};
