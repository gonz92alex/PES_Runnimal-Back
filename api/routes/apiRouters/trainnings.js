var express = require("express");

var trainning = require('../../controllers/trainningController');

var trainningsRouter = express.Router();

trainningsRouter.route("/")
  .get(trainning.list)
  .post(trainning.newTrainning);

trainningsRouter.route("/:id")
  .get(trainning.getOne)
  .delete(trainning.deleteOne);

module.exports = trainningsRouter;
