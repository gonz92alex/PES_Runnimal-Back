var express = require("express");

var usersRelationshipsController = require('../../controllers/usersRelationshipsController');
var friendsRouter = express.Router();

///friendsRouter.get("/:userId", );

friendsRouter.get("/search", usersRelationshipsController.searchFriends);

friendsRouter.delete("/delete/:id", usersRelationshipsController.deleteFriendshipRelationship);

friendsRouter.get("/prova", usersRelationshipsController.list);
friendsRouter.get("/new", usersRelationshipsController.newDefault);
 
module.exports = friendsRouter;