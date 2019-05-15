'use strict';

var Owners = require('../db/owners');
var Users = require('./users');
var Pets = require('./pets');
var ObjectId = require('mongodb').ObjectID;

exports.getAll = function () {
	return Owners.find()
		.populate({ path: 'userId', select: 'email alias' })
		.populate('petId');
};

exports.newOwner = function (userId, petId) {
	Users.getOneById(userId).then(function(user){
		if (user) {
			Pets.getOneById(petId).then(function(pet){
				if (pet) {
					//s'hauria de comprovar que no es owner ja
					var owner = new Owners({
						userId: userId,
	    				petId: petId
					});
					return owner.save();
				}
			});
		}
	});
};

exports.getUserPets = function (ownerEmail) {
	Users.getOne(ownerEmail).then(function (user){
		return Owners.find({'userId': user._id}).populate('petId');
	})
}