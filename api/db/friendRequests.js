var mongoose = require('mongoose');

var friendRequests_schema = new mongoose.Schema({
	requestingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	requestedId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
});

var FriendRequests = mongoose.model("FriendRequests", friendRequests_schema);

module.exports = FriendRequests;