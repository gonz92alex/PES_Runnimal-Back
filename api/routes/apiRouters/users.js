var express = require("express");

var users = require('../../controllers/userController');

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


	

usersRouter.get("/id/:id", users.getOneById);
 
module.exports = usersRouter;