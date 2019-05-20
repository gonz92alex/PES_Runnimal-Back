/*name: String,
description: String,
steps: []*/

'use strict';

var Trainning = require('../models/trainning');

exports.list = function(req,res) {
    Trainning.getAll().then(function (trainnings){
        if (trainnings.length) return res.status(200).json(trainnings);
        else return res.status(204).send("No trainnings");
    }).catch(function (err){
        return res.status(404).send(err);
    });
};

exports.getOneById = function(req, res){
    var id = req.params.id;

    Trainning.getOneById(id).then(function (trainning){
        if (trainning) return res.status(200).json(trainning);
        else return res.status(204).send("Trainning doesn't exist")
    }).catch(function (err){
        return res.status(404).send(err);
    })
}

exports.new = function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var steps = req.body.steps;

    if (!name) return res.status(400).send("Bad request, no name provided");
    if (!description) return res.status(400).send("Bad request, no description provided");
    if (!steps) return res.status(400).send("Bad request, no steps provided");

    name = name.trim();
    description = description.trim();

    Trainning.new(name, description, steps).then(function (trainning){
        return res.status(201).json(trainning);
    }).catch(function (err){
        return res.status(404).send(err);
    });
}

exports.edit = function(req, res){
    var id = req.params.id;

    var name = req.body.name;
    var description = req.body.description;
    var steps = req.body.steps;

    Trainning.edit(id, name, description, steps).then(function (trainning){
        return res.status(201).json(trainning);
    }).catch(function (err){
        return res.status(404).send(err);
    })
}

exports.delete = function(req, res){
    var id = req.params.id;

    Trainning.delete(id).then(function (trainning){
        if(trainning) return res.status(200).json(trainning);
        return res.status(204).send("Trainning doesn't exists");
    }).catch(function (err){
        return res.status(404).send(err);
    })
}
