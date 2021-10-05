const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    userName : String,
    contactNo : Number,
    emailId : String,
    password : String,
    role : String,
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;