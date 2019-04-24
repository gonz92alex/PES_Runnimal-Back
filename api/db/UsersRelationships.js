var mongoose = require('mongoose');

var types = ["friend", "blocked"];

var friends_schema = new mongoose.Schema({
	//relatingUserId < relatedUserId
	relatingUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	relatedUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	date: String,
	type: {type: String, enum: {values: types, message: "type wrong"}}
});

var UsersRelationships = mongoose.model("UsersRelationships", friends_schema);

module.exports = UsersRelationships;