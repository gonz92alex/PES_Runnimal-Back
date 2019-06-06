var express = require("express");

var trainning = require('../../controllers/trainningController');

var trainningsRouter = express.Router();

trainningsRouter.route("/")
  .get(trainning.list)
  .post(trainning.new);

trainningsRouter.route("/:id")
  .get(trainning.getOneById)
  .put(trainning.edit)
  .delete(trainning.delete);

module.exports = trainningsRouter;
