var express = require("express");

var users = require('../../controllers/admin/userController');

var usersRouter = express.Router();

usersRouter.route("/")
	.get(users.list);

usersRouter.route("/new")
	.get(users.newForm)
	.post(users.new);

usersRouter.route("/:id")
	.get(users.view)
	.post(users.edit);

 
module.exports = usersRouter;