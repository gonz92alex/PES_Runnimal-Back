var express = require("express");

var usersRelationshipsController = require('../../controllers/usersRelationshipsController');
var friendsRouter = express.Router();

///friendsRouter.get("/:userId", );

friendsRouter.get("/search", usersRelationshipsController.searchFriends);

friendsRouter.get("/user/:userEmail", usersRelationshipsController.userFriends);

friendsRouter.get("/:requestingEmail/:requestedEmail", usersRelationshipsController.areFriends);

friendsRouter.delete("/delete/:id", usersRelationshipsController.deleteFriendshipRelationship);

friendsRouter.get("/list", usersRelationshipsController.list);
//friendsRouter.get("/new", usersRelationshipsController.newDefault);
 
module.exports = friendsRouter;