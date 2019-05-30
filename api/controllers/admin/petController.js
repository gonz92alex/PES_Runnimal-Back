'use strict';

var Pets = require('../../models/pets');
var Users = require('../../models/users');

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
    	return res.redirect("/admin/users/" + userId + "?alert=newPet");
    }).catch(function(err) {
        return res.status(404).send(err);
    });
}

exports.actionPet = function(req, res){
	var petId = req.params.id;
	var userId = req.query.userId;
	var action = req.query.action;
	if (action == "delete") {
		Pets.deleteById(petId).then(function (pet){
			return res.redirect("/admin/users/" + userId + "?alert=deletePet");
		}).catch(function (err){

		})
	} else{
		return res.send("adeu");
	}
}

exports.actionOwners = function(req, res){
	var petId = req.params.id;
	var action = req.query.action;
	var userId = req.query.userId;
	var otherOwnerEmail = req.query.otherOwnerEmail;

	Pets.removeOwner(petId, otherOwnerEmail).then( function(pet){
		return res.redirect("/admin/users/" + userId + "?alert=ownerDeleted");
	}).catch(function(err){
		return res.send("err");
	})
}

exports.addOwner = function(req, res){
	
	var userId = req.body.userId;
	var petId = req.body.petId;
	var otherOwnerEmail = req.body.otherOwnerEmail;

	Pets.addOwner(petId, otherOwnerEmail).then(function (pet){
		return res.redirect("/admin/users/" + userId + "?alert=ownerAdded");
	}).catch( function (err){
		return res.send("error");
	})
}