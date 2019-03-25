/*nombre: String,
    peso: Number,
    descripcion: String,
    tamano: Number, 
    raza: String,
    naciemiento: Number*/

    'use strict';

    var mongoose = require('mongoose').set('debug',true);
    var Pets = require('../models/Pets');
    var Users = require('../models/Users');
    var ObjectId = require('mongodb').ObjectID;
    
    
    
    
    exports.list = function(req,res) {
        Pets.find().exec((err,pets) => {
            if (err)
                res.send(err);
            else
                res.json(pets);
        });
    };
    
    exports.newPet = function(req,res) {
        var name = req.body.name;
        var weight = req.body.weight;
        var race = req.body.race;
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
        race = race.trim();
        birth = birth;
        description = description.trim();
        size = size;
        owner = owner.trim();
        Users.findOne({'email': owner}).exec((error, user) =>{
            if (error) res.status(400).send("Owner doesn't exis");
            else{
                Pets.findOne({'name': name, 'owner':user.id})
                    .exec((err, result) => {
                    if (result) {
                        return res.json(result);
                    }
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
                        pet.save(function(err) {
                            return res.json(pet);
                        });
                    }
                });   
            }
        });          
    };
    
    exports.getOne = function(req,res) {
        var name = req.params.name;
        var owner = req.params.owner;
        if (!name) return res.status(400).send("Bad request, no name provided");
        if (!owner) return res.status(400).send("Bad request, no owner provided");
        name = name.trim();
        owner = owner.trim();
        Users.findOne({'email': owner}).exec((error, user) =>{
            if (error) res.status(400).send("Owner doesn't exist");
            else{
                Pets.findOne({'name': name, 'owner':ObjectId(user._id)})
                    .exec((err, pet) => {
                        console.log(pet)
                        console.log(err);
                        console.log(name)
                        console.log(user.id);
                    if (pet) {
                        return res.json(pet);
                    }
                    else {
                        return res.json(err);
                    }
                });   
            }
        });
    };
    
    exports.editPet = function(req, res) {
        var name = req.params.name; 
        var owner = req.params.owner; 

        var weight = req.body.weight;
        var description = req.body.description;
        var size = req.body.size;
        var race = req.body.race;
        var birth = req.body.birth;
        //Rentaría mover esta parte a a otra capa. Pedir Explicación al profesor.
        Users.findOne({'email' :owner}).exec((err, user) => {
            if(user) {
                Pets.findOne({'name' : name, 'owner' :ObjectId(user._id)}).exec((error, pet) => {
                if(pet){
                    if(size) pet.size = size; 
                    if(weight) pet.weight = weight; 
                    if(race) pet.race = race.trim(); 
                    if(birth) pet.birth = birth; 
                    if(description) pet.description = description.trim(); 
                    pet.save(function(err) {
                        return res.json(pet);
                    }); 
                    } else {
                        return res.status(404).send("Pet " + name  + " not found for user " + owner); 
                        }
                    })
                } else {
                 return res.status(404).send("User " + owner + " not found." ); 
            }
        }); 
    }


    exports.deleteOne = function(req,res) {
        var name = req.params.name;
        var owner = req.params.owner;
        if (!name) return res.status(400).send("Bad request, no name provided");
        if (!owner) return res.status(400).send("Bad request, no owner provided");
        name = name.trim();
        owner = owner.trim();
        Users.findOne({'email': owner}).exec((error, user) =>{
            if (error) res.status(400).send("Owner doesn't exist");
            else{
                Pets.findOne({'name': name, 'owner':ObjectId(user._id)})
                    .exec((err, pet) => {
                    if (pet) {
                        Users.remove({_id:ObjectId(pet._id)}, function(err){
                            if (!err) res.send('{"result":"OK"}');
                            else res.send('{"result":"KO"}');
                        });
                    }
                    else {
                        if (err) res.json(err);
                        else res.status(400).send("Pet doesn't exist");
                    }
                });   
            }
        });
    };