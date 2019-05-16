var express = require("express");
var login = require('../../controllers/loginController');

var loginRouter = express.Router();

loginRouter.route("/")
	.post(login.createOrReturn);

loginRouter.route("/token/:token")
    .get(login.getUser)

module.exports = loginRouter;
