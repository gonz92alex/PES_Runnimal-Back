var express = require("express");

var points = require('../../controllers/pointController');

var pointsRouter = express.Router();

pointsRouter.route("/")
  .get(points.list)
  .post(points.newPoint);

pointsRouter.delete("/:id", points.delete);

module.exports = pointsRouter;