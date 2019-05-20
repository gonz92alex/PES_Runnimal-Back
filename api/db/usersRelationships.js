var mongoose = require('mongoose');

var status = ["friend", "pending", "denied"];

var friends_schema = new mongoose.Schema({
	user1: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	user2: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	date: String,
	type: {type: String, enum: {values: status, message: "status wrong"}}
});

var UsersRelationships = mongoose.model("UsersRelationships", friends_schema);

module.exports = UsersRelationships;