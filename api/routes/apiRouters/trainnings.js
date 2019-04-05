var express = require("express");

var trainning = require('../../controllers/trainningController');

var trainningsRouter = express.Router();

trainningsRouter.get("/new", function(req, res){
  res.render('api/trainnings/new');
});

trainningsRouter.route("/")
  .get(trainning.list)
  .post( function(req, res){
  	res.send(req.body);
  	//trainning.newTrainning(req, res);
  });

/*trainningsRouter.route("/:id")
  .get(trainning.list)
  .put(function(req, res){

  })
  .delete(function(req, res){

  });*/

module.exports = trainningsRouter;
