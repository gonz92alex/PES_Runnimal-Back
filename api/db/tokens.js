var mongoose = require('mongoose');
var users = require('mongoose').model('users').schema


var tokenModel = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true },
    duration: Number
});


tokenModel.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('token',tokenModel);