var express = require("express");

var Users = require('../../controllers/userController');

var pointsRouter = express.Router();

pointsRouter.route("/")
  .get(Users.ranking)
 
  
module.exports = pointsRouter;