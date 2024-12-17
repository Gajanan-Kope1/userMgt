const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UploadSchema = new Schema({
	title		: {type:String,default: ""},
	desc		: {type:String,default: ""},
	video		: {type:String,default: ""},
	userId	 	: {type:mongoose.Types.ObjectId,default: null},
},{id:false, timestamps:{ createdAt: "created_at", updatedAt: "updated_at" }, versionKey:false, strictQuery:false, collection:"uploads"});

UploadSchema.virtual("id").get(function() {
	return this._id.toHexString();
});

UploadSchema.set("toJSON", {
	virtuals: true,
	transform: function (doc, ret) {   delete ret._id;  }
});

module.exports =  mongoose.models.Upload || mongoose.model("Upload", UploadSchema);