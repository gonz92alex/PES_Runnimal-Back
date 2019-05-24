var express = require("express");

var pets = require('../../controllers/admin/petController');

var petsRouter = express.Router();

petsRouter.route("/new")
	.post(pets.new);

module.exports = petsRouter;