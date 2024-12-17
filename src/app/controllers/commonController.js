/**
* Function that fileUpload
* @param fileUpload. 
* @return
*/

exports.fileUpload = async (req, res) => {
	try {
		let data = req.files?.map(file => file.filename);
		res.status(200).send({ status: 200, msg: "success", data: data });
	} catch (err) {
		res.status(400).send({ status: 400, msg: err.message, data: null });
	}
};
