var express = require("express");

var pets = require('../../controllers/petController');
var petsRouter = express.Router();

petsRouter.route("/")
	.get(pets.list)
	.post(pets.newPet);

petsRouter.route("/:id")
	.get(pets.getOneById);

petsRouter.route("/:id/owners")
	.get(pets.getPetOwners)
	.put(pets.removeOwner)
	.post(pets.addOwner);

petsRouter.route("/:owner/:name")
	.get(pets.getOne)
	.put(pets.editPet)
	.delete(pets.deleteOne);

module.exports = petsRouter;
