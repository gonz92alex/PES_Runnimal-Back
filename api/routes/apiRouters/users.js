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
	.put(users.editUser)
	.delete(users.deleteOne);

usersRouter.get("/id/:id", users.getOneById);
 
module.exports = usersRouter;