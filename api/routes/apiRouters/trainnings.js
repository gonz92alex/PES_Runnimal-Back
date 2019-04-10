var express = require("express");

var trainning = require('../../controllers/trainningController');

var trainningsRouter = express.Router();

trainningsRouter.get("/new", function(req, res){
  res.render('api/trainnings/new');
});

trainningsRouter.route("/")
  .get(trainning.list)
  .post(trainning.newTrainning);

trainningsRouter.route("/:id")
  .get(trainning.getOne)
  .delete(trainning.deleteOne);

module.exports = trainningsRouter;
