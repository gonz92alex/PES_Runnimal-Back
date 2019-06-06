var express = require("express");

var trainnings = require('../../controllers/admin/trainningController');

var trainningsRouter = express.Router();

trainningsRouter.route("/")
	.get(trainnings.list)
	.post(trainnings.new);

trainningsRouter.route("/:id")
	.get(trainnings.view)
	.post(trainnings.edit);

trainningsRouter.route("/:id/steps")
	.get(trainnings.actionSteps)
	.post(trainnings.addStep);
 
module.exports = trainningsRouter;