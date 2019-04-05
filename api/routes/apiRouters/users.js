var express = require("express");

var users = require('../../controllers/userController');

var usersRouter = express.Router();

usersRouter.get("/new", function(req, res){
	res.render('api/users/new');
})

usersRouter.route("/")
	.get(users.list)
	.post(users.newUser);

usersRouter.route("/:email")
	.get(users.getOne)
	.delete(users.deleteOne);
 
module.exports = usersRouter;