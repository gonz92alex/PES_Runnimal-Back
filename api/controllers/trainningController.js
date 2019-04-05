'use strict';

var mongoose = require('mongoose').set('debug',true);
var Trainning = require('../models/Trainning');

exports.list = function(req,res) {
    Trainning.find(function(err, trainnings){
    	if (err)
            res.send(err);
        else
            res.json(trainnings);
    });
};

exports.newTrainning = function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var trainning = new Trainning(name, description);

    console.log("Hola"+name);   
    console.log(description);
};

exports.save = function(name, description){
	var trainning = new Trainning({
                                    name: name, 
                                    description: description
                                });

	trainning.save();
};