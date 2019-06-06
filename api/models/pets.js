/*nombre: String,
peso: Number,
descripcion: String,
tamano: Number, 
raza: String,
naciemiento: Number*/

'use strict';

var Pets = require('../db/pets');
var Users = require('./users');
var ObjectId = require('mongodb').ObjectID;

exports.new = function(ownerEmail, name, weight, breed, birth, description, size) {
    name = name.trim();
    description = description.trim();

    return Users.getOne(ownerEmail).then(function (user){	
        var pet = new Pets({
            name: name,
            weight:weight,
            breed:breed,
            birth:birth,
            description:description,
            size:size,
            owner:user._id
        });
        return pet.save();
    });
};

exports.edit = function (owner, name, weight, description, size, breed, birth) {
	
    return this.getOne(owner, name).then(function (pet){

		pet.name = (!name) ? pet.name : name;
		pet.weight = (!weight) ? pet.weight : weight;
		pet.description = (!description) ? pet.description : description;
		pet.size = (!size) ? pet.size : size;
		pet.breed = (!breed) ? pet.breed : breed;
		pet.birth = (!birth) ? pet.birth : birth; 

        return pet.save();
	}).catch(function (err) {

	});
};

exports.addOwner = function(petId, userEmail) {
    return Users.getOne(userEmail).then(function (user){
        return Pets.findById(petId).then(function (pet){
            if(pet.owner != user._id && (pet.otherOwners).indexOf(user._id) == -1){
                pet.otherOwners.push( ObjectId(user._id) );
                return pet.save();
            } else {
                return pet;
            }
        }).catch(function (err){

        });
    }).catch(function (err) {

    });
};

exports.removeOwner = function(petId, userEmail) {
    return Users.getOne(userEmail).then(function (user){
        return Pets.findById(petId).then(function (pet){
            var index = pet.otherOwners.indexOf(user._id);
            if(index > -1){
                pet.otherOwners.splice(index, 1);
                return pet.save();
            } else {
                return pet;
            }
        }).catch(function (err){

        });
    }).catch(function (err) {

    });
}

exports.delete = function(ownerEmail, petName){
    return this.getOne(ownerEmail, petName).then(function (pet) {
		return Pets.remove({_id:ObjectId(pet._id)});
	}).catch(function (err){

    });
};

exports.deleteById = function(petId) {
    return Pets.remove({_id: ObjectId(petId)});
}

exports.getAll = function() {
	return Pets.find().populate({ path: 'owner', select: 'email alias' })
            .populate('otherOwners');;
};

exports.getOne = function(ownerEmail, petName){
	return Users.getOne(ownerEmail).then((user) => {
		return Pets.findOne({'name': petName, 'owner':ObjectId(user._id)})
			.populate({ path: 'owner', select: 'email alias' })
			.populate('otherOwners');
	});
};

exports.getOneById = function (id) {
	return Pets.findById(id)
		.populate({ path: 'owner', select: 'email alias' })
		.populate('otherOwners');
};

exports.getUserPets = function(userEmail){

    return Users.getOne(userEmail).then(function(user){
        return Pets.find( { $or:[ {'owner': ObjectId(user._id)}, {'otherOwners': ObjectId(user._id)} ]})
            .populate({ path: 'owner', select: 'email alias' })
            .populate('otherOwners');
    }).catch(function(err){

    });
}

exports.getPetOwners = function(id) {
    return Pets.findById(id, 'owner')
        .populate({ path: 'owner', select: 'email alias' })
        .populate('otherOwners');
}