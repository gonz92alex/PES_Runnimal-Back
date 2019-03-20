/*nombre: String,
    peso: Number,
    descripcion: String,
    tamano: Number, 
    raza: String,
    naciemiento: Number*/

    'use strict';

    var mongoose = require('mongoose').set('debug',true);
    var Pets = require('../models/Pets');
    
    
    
    
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
        weight = weight.trim();
        race = race.trim();
        birth = birth.trim();
        description = description.trim();
        size = size.trim();
    
        //console.log(alias+', '+email+', '+password)
        Users.findOne({'name': name, 'owner':owner})
            .exec((err, result) => {
                if (result) {
                    return res.json(result);
                }
                else {
                    var usr = new Users({
                        alias: alias,
                        email: email,
                        password: password
                    });
                    usr.save(function(err) {
                        return res.json(usr);
                    });
                }
            });        
    };
    
    exports.getOne = function(req,res) {
        var email = req.params.email;
        if (!email) return res.status(432).send("Bad request, no email provided");
        
        email = email.trim();
        Users.findOne({'email': email}).exec((err,user) => {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
    };
    
    exports.deleteOne = function(req,res) {
        var email = req.params.email;
        if (!email) return res.status(432).send("Bad request, no email provided");
        
        email = email.trim();
        Users.findOne({'email': email}).exec((err,user) => {
            if (err)
                res.send(err);
            else
                Users.remove({_id:user._id}, function(err){
                    if (!err) res.send('{"result":"OK"}');
                    else res.send('{"result":"KO"}');
                });
        });
    };