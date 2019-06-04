var express = require("express");
var auth = require('../../controllers/authController');

var authRouter = express.Router();

authRouter.route("/login")
	.post(auth.login);

authRouter.route("/signup")
	.post(auth.signup);

module.exports = authRouter;
