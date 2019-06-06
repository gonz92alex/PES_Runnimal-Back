'use strict';

var Pets = require('../models/pets');

exports.list = function(req,res) {
    Pets.getAll().then(function(users){
        if(users.length) return res.status(200).json(users);
        else return res.status(204).json("No pets");
    }).catch(function(err){
        return res.status(404).json({'error':err});
    });
};


exports.newPet = function(req,res) {
    var name = req.body.name;
    var weight = req.body.weight;
    var breed = req.body.breed;
    var birth = req.body.birth;
    var description = req.body.description;
    var size = req.body.size;
    var owner = req.body.owner;
    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!size) return res.status(400).send("Bad request, no size provided");
    if (!birth) return res.status(400).send("Bad request, no birth provided");
    if (!owner) return res.status(400).send("Bad request, no owner provided");

    name = name.trim();
    weight = weight;
    breed = breed.trim();
    birth = birth;
    description = description.trim();
    size = size;
    owner = owner.trim();
    
    Pets.new(owner, name, weight, breed, birth, description, size).then(pet => {
        return res.status(201).json(pet);
    }).catch(err => {
        return res.status(404).send(err);
    });
};

exports.getOne = function(req,res) {
    var name = req.params.name;
    var owner = req.params.owner;

    name = name.trim();
    owner = owner.trim();

    Pets.getOne(owner, name).then((pet) => {
        if (pet) return res.status(200).json(pet);
        else return res.status(404).send("Pet doesn't exists");
    }).catch(err=>{
        return res.status(404).send(err);
    });
};

exports.getOneById = function(req, res) {
    var petId = req.params.id;

    Pets.getOneById(petId).then((pet) => {
        if(pet) return res.status(200).json(pet);
        else return res.status(404).send("Pet doesn't exist");
    }).catch( err => {
        return res.status(404).send(err);
    });
}

exports.getPetOwners = function (req, res){
    var petId = req.params.id;

    Pets.getPetOwners(petId).then((pet) => {
        if (pet.length) return res.status(200).json(pet);
        else return res.status(204).send("Pet doesn't have owners")
    }).catch( err => {
        return res.status(404).send(err);
    });
}

exports.getUserPets = function(req, res){
    var userEmail = req.params.email;

    Pets.getUserPets(userEmail).then((pets) => {
        if (pets.length) return res.status(200).json(pets);
        else return res.status(204).send("User doesn't have pets");
    }).catch(function (err){
        return res.status(404).json({'error':err});
    });
}

exports.editPet = function(req, res) {
    var name = req.params.name; 
    var owner = req.params.owner; 

    var weight = req.body.weight;
    var description = req.body.description;
    var size = req.body.size;
    var breed = req.body.breed;
    var birth = req.body.birth;
    
    Pets.edit(owner, name, weight, description, size, breed, birth)
    .then(function (petEdited){
        return res.status(201).json(petEdited);
    }).catch(function(err) {
        return res.status(404).send(err);
    });
}

exports.deleteOne = function(req,res) {
    var name = req.params.name;
    var owner = req.params.owner;

    name = name.trim();
    owner = owner.trim();
    
    Pets.delete(owner, name).then(function(result){
        if (result) return res.status(200).json(result);
        return res.status(204).send("Pet doesn't exists");
    }).catch(function(err){
        return res.status(404).send(err);
    });
};

exports.addOwner = function (req, res){
    var petId = req.params.id;
    var ownerEmail = req.body.userEmail;

    if (!ownerEmail) return res.status(400).send("Bad request, no owner email provided");

    Pets.addOwner(petId, ownerEmail).then(function(pet){
        return res.status(201).json(pet);
    }).catch(function (err){
        return res.status(404).send(err);
    });
}

exports.removeOwner = function (req, res){
    var petId = req.params.id;
    var ownerEmail = req.body.userEmail;

    if (!ownerEmail) return res.status(400).send("Bad request, no owner email provided");

    Pets.removeOwner(petId, ownerEmail).then(function(pet){
        return res.status(201).json(pet);
    }).catch(function (err){
        return res.status(404).send(err);
    });
}
