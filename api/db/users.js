    
var mongoose = require('mongoose');

var roles = ["admin", "user"];

var UsersModel = new mongoose.Schema({
    alias: String,
    email: String, 
    password: String,
    role: {type: String, enum: {values: roles, message: "wrong role"}},
    points: Number
});

module.exports = mongoose.model('users',UsersModel);