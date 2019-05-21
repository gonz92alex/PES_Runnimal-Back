var express = require("express");

var users = require('../../controllers/admin/userController');

var usersRouter = express.Router();

usersRouter.route("/")
	.get(users.list);

 
module.exports = usersRouter;