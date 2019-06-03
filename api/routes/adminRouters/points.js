var express = require("express");

var points = require('../../controllers/admin/pointController');

var pointsRouter = express.Router();

pointsRouter.route("/")
	.get(points.list)
	.post(points.new);

pointsRouter.route("/:id")
	.get(points.actionPoints);
 
module.exports = pointsRouter;