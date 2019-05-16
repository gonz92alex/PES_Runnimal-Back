var express = require("express");

var usersRelationships = require('../../controllers/usersRelationshipsController');
var friendsRouter = express.Router();

friendsRouter.route("/")
	.post(usersRelationships.newFriendRequest);

friendsRouter.route("/:id")
	.put(usersRelationships.answerFriendRequest)
	.delete(usersRelationships.deleteFriendshipRelationship);

friendsRouter.route("/:user1email/:user2email")
	.get(usersRelationships.areFriends);

module.exports = friendsRouter;
