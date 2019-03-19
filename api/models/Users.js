var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    alias: String,
    email: String, 
    password: String
},
{
    versionKey: false
});

//var users = mongoose.model('users', Users);