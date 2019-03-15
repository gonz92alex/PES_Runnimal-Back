var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    alias: String,
    email: String, 
    password: String
});

//var users = mongoose.model('users', Users);