const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
}, { versionKey: false });
 
const UserModel = mongoose.model("users", UserSchema)
 
module.exports = UserModel;