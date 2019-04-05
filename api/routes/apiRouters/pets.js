var express = require("express");

var pets = require('../../controllers/petController');

var petsRouter = express.Router();

petsRouter.get("/new", function(req, res){
  res.render('api/trainnings/new');
});

petsRouter.route("/")
  .get(pets.list)
  .post(pets.newPet);

petsRouter.route("/:owner/:name")
  .get(pets.getOne)
  .delete(pets.deleteOne);

module.exports = petsRouter;
