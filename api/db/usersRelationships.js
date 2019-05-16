var mongoose = require('mongoose');

var types = ["friend", "pending", "denied"];

var friends_schema = new mongoose.Schema({
	userId1: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	userId2: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	date: String,
	type: {type: String, enum: {values: types, message: "type wrong"}}
});

var UsersRelationships = mongoose.model("UsersRelationships", friends_schema);

module.exports = UsersRelationships;