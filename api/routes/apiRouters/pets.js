var express = require("express");

var pets = require('../../controllers/petController');

var petsRouter = express.Router();

petsRouter.get("/new", function(req, res){
  res.render('api/trainnings/new');
});

petsRouter.route("/")
  .get(pets.list)
  .post( function(req, res){
  	res.send(req.body);
  	//trainning.newTrainning(req, res);
  });

/*petsRouter.route("/:id")
  .get(trainning.list)
  .put(function(req, res){

  })
  .delete(function(req, res){

  });*/

module.exports = petsRouter;
