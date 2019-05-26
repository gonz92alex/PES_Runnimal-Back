var express = require("express");

var pets = require('../../controllers/admin/petController');

var petsRouter = express.Router();

petsRouter.route("/new")
	.post(pets.new);

petsRouter.route("/:id")
	.get(pets.actionPet);

petsRouter.route("/:id/owners")
	.get(pets.actionOwners)
	.post(pets.addOwner);

module.exports = petsRouter;