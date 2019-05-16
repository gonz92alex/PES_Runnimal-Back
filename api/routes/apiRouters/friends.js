var express = require("express");

var usersRelationships = require('../../controllers/usersRelationshipsController');
var friendsRouter = express.Router();

friendsRouter.route("/")
	.post(usersRelationships.newFriendRequest)
	.get(usersRelationships.userFriends);

friendsRouter.route("/:id")
	.put(usersRelationships.answerFriendRequest)
	.delete(usersRelationships.deleteFriendshipRelationship);

friendsRouter.route("/:userId1/:userId2")
	.get(usersRelationships.areFriends);

module.exports = friendsRouter;
