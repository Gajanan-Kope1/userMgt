const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
	token 		: {type:String,default:""},
	device_id	: {type:String,default: ""},
},{_id:false, timestamps:{ createdAt: "created_at", updatedAt: "updated_at" }});

const UserSchema = new Schema({
	email		  : {type:String,default: ""},//unique: true
	phone		  : {type:String,default: ""},//unique: true
	password 	  : {type:String,default: ""},
	f_name	 	  : {type:String,default: ""},
	l_name	 	  : {type:String,default: ""},
	bio 		  : {type:String,default:""},
	logo 		  : {type:String,default:""},
	auth_token 	  : [authSchema],
},{id:false, timestamps:{ createdAt: "created_at", updatedAt: "updated_at" }, versionKey:false, strictQuery:false, collection:"users"});

UserSchema.virtual("id").get(function() {
	return this._id.toHexString();
});

UserSchema.set("toJSON", {
	virtuals: true,
	transform: function (doc, ret) {   delete ret._id;  }
});

module.exports =  mongoose.models.User || mongoose.model("User", UserSchema);