    
var mongoose = require('mongoose');

var UsersModel = new mongoose.Schema({
    alias: String,
    email: String, 
    password: String,
    points: Number
});

module.exports = mongoose.model('users',UsersModel);