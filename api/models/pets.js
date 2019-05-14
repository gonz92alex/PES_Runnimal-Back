/*nombre: String,
peso: Number,
descripcion: String,
tamano: Number, 
raza: String,
naciemiento: Number*/

'use strict';

var Pets = require('../db/pets');
var Users = require('./users');
var Owners = require('./owners');
var ObjectId = require('mongodb').ObjectID;


exports.new = function(ownerEmail, name, weight, race, birth, description, size) {
    name = name.trim();
    description = description.trim();

    return Users.getOne(ownerEmail).then(function (user){
    	
        var pet = new Pets({
            name: name,
            weight:weight,
            race:race,
            birth:birth,
            description:description,
            size:size,
            owner:user._id
        });
        return pet.save();
    });
};

exports.edit = function (id, name, weight, description, size, race, birth) {
	return this.getOneById(id).then(function (pet){
		pet.name = name;
		pet.weight = weight;
		pet.description = description;
		pet.size = size;
		pet.race = race;
		pet.birth = birth; 
        return pet.save();
	}).catch(function (err) {
		return {'error': err};
	});
};

exports.addOwner = function(petId, userEmail) {

    return Users.getOne(userEmail).then(function (user){
        return Pets.findById(petId).then(function (pet){

        }).catch(function (err){

        });
    }).catch(function (err) {

    });

    /*return this.getOneById(petId).then(function (pet){
        return Users.getOne(userEmail).then(function (user){
            console.log("hola hola")
            console.log(pet.otherOwners.find(x => x.id === pet._id));
            //if(!pet.otherOwners[pet.otherOwners.indexOf(petId)]){
                pet.otherOwners.push(user._id);
                return pet.save();
            } else {
                console.log("ja existe el owner");
            }//
        }).catch(function (err){

        });
    }).catch(function (err){

    });*/
};

exports.removeOwner = function(petId, userEmail) {
    
}

exports.delete = function(ownerEmail, petName){
	this.getOne(ownerEmail, petName).then(function (pet) {
		Pets.remove({_id:ObjectId(pet._id)}, function(err){
			if (err) return err;
			return {'status': 'pet removed'}
		})
	})
};

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