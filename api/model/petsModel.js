'use strict';

var Pets = require('../db/Pets');
var Users = require('./usersModels');
var ObjectId = require('mongodb').ObjectID;
    

exports.all = function() {
    return Pets.find();
};
    
exports.newPet = function(name, weight, race, birth, description, size, owner) { 
    // Habria que validar los datos TODO
    name = name.trim();
    weight = weight;
    race = race.trim();
    birth = birth.trim();
    description = description.trim();
    size = size.trim();
    owner = owner.trim();
    Users.getOne(owner).then(function(user){
        if (user){
            this.findOne(name, user).then(function(pet){
                if (pet){
                    return {'error': 'Pet already exists'}
                }
                else{
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
            })
            .catch(err=>{
                return {'error': err}
            }); 
        }
        else{
            return {'error':"Owner doesn't exists"}
        }
    })
    .catch(err=>{
        return {'error': err}
    });
}
    
exports.getOne = function(name, owner) {
    name = name.trim();
    owner = owner.trim();
    Users.getOne(owner).then(function(user){
        if (user){
            Pets.findOne({'name': name, 'owner':ObjectId(user._id)}).then(function(pet){
                if (pet) return {'pet':pet};
                else return {'error':"Pet doesn't exists"}
            })
            .catch(err=>{
                return {'error': err}
            });
        }
        else{
            return {'error':"Owner doesn't exists"}
        }
    })
    .catch(err=>{
        return {'error': err}
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