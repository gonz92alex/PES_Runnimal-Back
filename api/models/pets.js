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

    Users.getOne(ownerEmail).then(function (user){
    	if (user) return {'error': 'User already exists'};
        else {
        	var pet = new Pets({
                name: name,
                weight:weight,
                race:race,
                birth:birth,
                description:description,
                size:size,
                owner:user.id
            });
            pet = pet.save();
            Owners.newOwner(user._id, pet._id);
            return pet;
        }      
    });
};

exports.edit = function (id, name, weight, description, size, race, birth) {
	this.getOneById(id).then(function (pet){
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

exports.addOwner = function(petId, ownerEmail) {
    return this.getOneById(petId).then(function (pet) {
        return Users.getOne(ownerEmail).then(function (user){
            pet.other_owners.push(user._id);
            return pet.save();
        }).catch(function (err){

        });
    }).catch(function (err){

    });
};

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
            .populate('other_owners');;
};

exports.getOne = function(ownerEmail, petName){
	return Users.getOne(ownerEmail).then((user) => {
		return Pets.findOne({'name': petName, 'owner':ObjectId(user._id)})
			.populate({ path: 'owner', select: 'email alias' })
			.populate('other_owners');
	});
};

exports.getOneById = function (id) {
	return Pets.findById(id)
		.populate({ path: 'owner', select: 'email alias' })
		.populate('other_owners');
};

exports.getUserPets = function(userEmail){
    
    return Users.getOne(userEmail).then(function(user){
        Pets.find()
    }).catch(function(err){

    });

    Users.findOne({'email': userEmail}).exec(function(err, user){ //Falta refactorizarlo a las tres capas
            if(err) return res.status(400).send(err);
            if(!user) return res.status(400).send("No user with this email");
            Pets.find({'owner':ObjectId(user._id)})
                .or([{ other_owners: user._id}])
                .populate({ path: 'owner', select: 'email alias' })
                .populate('other_owners');
        });
}
