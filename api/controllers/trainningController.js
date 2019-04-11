/*name: String,
description: String,
steps: []*/

'use strict';

var mongoose = require('mongoose').set('debug',true);
var Trainning = require('../models/Trainning');
var ObjectId = require('mongodb').ObjectID;

exports.list = function(req,res) {
    Trainning.find().exec((err,Trainning) => {
        if (err)
            res.send(err);
        else
            res.json(Trainning);
    });
};

exports.newTrainning = function(req,res) {
    var name = req.body.name;
    var description = req.body.description;
    var steps = req.body.steps;

    if (!name) return res.status(400).send("Bad request, no name provided");

    name = name.trim();
    description = description.trim();
    
    Trainning.findOne({'name': name})
        .exec((err, result) => {
        if (result) {
            return res.json(result);
        }
        else {
            var trainning = new Trainning({
                name: name,
                description:description,
                steps: steps
            });
            trainning.save(function(err) {
                return res.json(trainning);
            });
        }
    });   
};

exports.getOne = function(req,res) {
    var id = req.params.id;

    if (!id) return res.status(400).send("Bad request, no id provided");

    Trainning.findById(id, function (err, trainning) {
        if(trainning){
            return res.json(trainning);
        } else {
            return res.json(err);
        }
    });
    
};

exports.deleteOne = function(req,res) {
    var id = req.params.id;

    if (!id) return res.status(400).send("Bad request, no id provided");

    Trainning.findById(id, function (err, trainning) {
        if(trainning){
            Trainning.remove({_id:ObjectId(trainning._id)}, function(err){
                if (!err) res.send('{"result":"OK"}');
                else res.send('{"result":"KO"}');
            });
        } else {
            if (err) res.json(err);
            else res.status(400).send("Trainning doesn't exist");
        }
    });
};