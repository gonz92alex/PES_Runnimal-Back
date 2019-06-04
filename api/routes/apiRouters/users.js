var express = require("express");

var users = require('../../controllers/userController');
var pets = require('../../controllers/petController');
var friends = require('../../controllers/usersRelationshipsController');
var walks = require('../../controllers/walksController')
var usersRouter = express.Router();

usersRouter.route("/")
	.get(users.list)
	.post(users.newUser);

usersRouter.route("/:email")
	.get(users.getOne)
	.put(users.editUser)
	.delete(users.deleteOne);
	usersRouter.route("/:email/addPoints")
		.put(users.addPointsToUser); 
	usersRouter.route("/:email/removePoints")
		.put(users.removePointsToUser); 

usersRouter.get("/:email/pets", pets.getUserPets);
usersRouter.get("/:email/friends", friends.userFriends);
usersRouter.get("/:email/friendRequests", friends.userFriendRequests);
usersRouter.get("/:email/ranking", users.filteredRanking);
//Rutas de Paseos
usersRouter.get("/:email/walks",walks.getUserWalks); 
usersRouter.get("/:email/walks/statistics",walks.getUserWalksStatistics); 

usersRouter.get("/id/:id", users.getOneById);

//Rutas de Entrenamientos 

usersRouter.post("/:email/trainnings/:trainningid",users.completeTrainning); 
usersRouter.get("/:email/trainnings/",users.getCompletedTrainnings);
usersRouter.get("/:email/statistics/",users.getCompletedTrainnings);




module.exports = usersRouter;