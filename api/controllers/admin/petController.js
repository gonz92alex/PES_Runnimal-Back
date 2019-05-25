'use strict';

var Pets = require('../../models/pets');

exports.new = function(req, res){
	var userId = req.body.userId;
	var ownerEmail = req.body.userEmail;
	var name = req.body.name;
	var description = req.body.description;
	var breed = req.body.breed;
	var size = req.body.size;
	var birth = req.body.birth;
	var weight = req.body.weight;

	Pets.new(ownerEmail, name, weight, breed, birth, description, size)
	.then(function(pet) {
    	return res.redirect("/admin/users/" + userId + "?action=newPet");
    }).catch(function(err) {
        return res.status(404).send(err);
    });
}

exports.actionPet = function(req, res){
	return res.send(req.query);
}