var express = require("express");

var pets = require('../../controllers/petController');

var petsRouter = express.Router();

petsRouter.route("/")
  .get(pets.list)
  .post(pets.newPet);

petsRouter.get("/user/:email", pets.getUserPets);

petsRouter.get("/id/:id", pets.getOneById);

petsRouter.route("/:owner/:name")
  .get(pets.getOne)
  .put(pets.editPet)
  .delete(pets.deleteOne);

module.exports = petsRouter;
