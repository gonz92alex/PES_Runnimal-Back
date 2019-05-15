'use strict';

var Pets = require('../models/pets');

exports.list = function(req,res) {
    Pets.getAll().then(function(users){
        return res.status(200).json(users);
    }).catch(function(err){
        return res.status(400).json({'error':err});
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
        return res.status(200).json(pet);
    }).catch(err => {
        return res.status(400).send(err);
    });
};

exports.getOne = function(req,res) {
    var name = req.params.name;
    var owner = req.params.owner;
    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!owner) return res.status(400).send("Bad request, no owner provided");
    name = name.trim();
    owner = owner.trim();

    Pets.getOne(owner, name).then((pet) => {
        if (pet) return res.json(pet);
        else return res.status(404).send("Pet doesn't exists");
    }).catch(err=>{
        return res.status(400).send(err);
    });
};

exports.getOneById = function(req, res) {
    var petId = req.params.id;
    if (!petId) return res.status(400).send("Bad request, no id provided");

    Pets.getOneById(petId).then((pet) => {
        if(pet) return res.json(pet);
        else return res.status(400).send("Pet doesn't exist");
    }).catch( err => {
        return res.status(400).send(err);
    });
}

exports.getPetOwners = function (req, res){
    var petId = req.params.id;
    if (!petId) return res.status(400).send("Bad request, no id provided");

    Pets.getPetOwners(petId).then((pet) => {
        return res.json(pet);
    }).catch( err => {
        return res.status(400).send(err);
    });
}

exports.getUserPets = function(req, res){
    var userEmail = req.params.email;

    if(!userEmail) return res.status(400).send("Bad request, no email provided");

    Pets.getUserPets(userEmail).then((pets) => {
        return res.status(200).json(pets);
    }).catch(function (err){
        return res.status(400).json({'error':err});
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
    
    Pets.getOne(owner, name).then(function (pet){
        if(!weight) weight = pet.weight;
        if(!description) description = pet.description;
        if(!size) size = pet.size;
        if(!breed) breed = pet.breed;
        if(!birth) birth = pet.birth;
        pets.edit(pet._id, name, weight, description, size, breed, birth)
            .then(function (petEdited){
                return res.status(200).json(petEdited);
            }).catch(function(err) {
                return res.status(400).send(err);
            });
    });
}

exports.deleteOne = function(req,res) {
    var name = req.params.name;
    var owner = req.params.owner;
    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!owner) return res.status(400).send("Bad request, no owner provided");
    name = name.trim();
    owner = owner.trim();
    
    Pets.delete(owner, name).then(function(result){
        return res.status(200).json(result);
    }).catch(function(err){
        return res.status(400).send(err);
    });
};

exports.addOwner = function (req, res){
    var petId = req.params.id;
    var ownerEmail = req.body.userEmail;

    if (!petId) return res.status(400).send("Bad request, no pet id provided");
    if (!ownerEmail) return res.status(400).send("Bad request, no owner email provided");

    Pets.addOwner(petId, ownerEmail).then(function(pet){
        return res.status(200).json(pet);
    }).catch(function (err){
        return res.status(400).send(err);
    });
}

exports.removeOwner = function (req, res){
    var petId = req.params.id;
    var ownerEmail = req.body.userEmail;

    if (!petId) return res.status(400).send("Bad request, no pet id provided");
    if (!ownerEmail) return res.status(400).send("Bad request, no owner email provided");

    Pets.removeOwner(petId, ownerEmail).then(function(pet){
        return res.status(200).json(pet);
    }).catch(function (err){
        return res.status(400).send(err);
    });
}
