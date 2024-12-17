const multer = require("multer");
const fs = require("fs");
var path = require("path");

const uploadDirectory = (filePath) => {
	const directoryPath = path.join(__dirname, "../../../", filePath);
	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath, { recursive: true });
	}
	return filePath;
};
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDirectory(`files`));
	},
	filename: function (req, file, cb) {
		let filename = file.originalname;
		cb(null, filename);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "video/mp4") {
		cb(null, true);
	} else {
		const error = new Error("Invalid file type. Only JPEG and PNG files are allowed.");
		error.code = "INVALID_FILE_TYPE";
		cb(error, false);
	}
};

//file upload
exports.upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 1024 * 1024 * 5 }
});

//file validation
exports.fileValidation = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		if (err.code === "LIMIT_FILE_SIZE") {
			return res.status(400).send({ status: 400, msg: "File size limit exceeded. Maximum file size is 5MB.", data: null });
		}
	}else if(err.code === "INVALID_FILE_TYPE"){
		return res.status(400).send({ status: 400, msg: err.message, data: null });
	}
	next(err);
};
