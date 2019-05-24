var express = require("express");

var walks = require('../../controllers/walksController');




var walksRouter = express.Router();

walksRouter.route("/")
    .get(walks.list)
    .post(walks.createWalk); 

walksRouter.route("/:id")
    .delete(walks.deleteWalk);



    
module.exports = walksRouter; 

