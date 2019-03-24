'use strict';

var mongoose = require('mongoose').set('debug',true);
var Training = require('../models/Training');


exports.list = function(req,res) {
    Training.find(function(err, trainings){
    	if (err)
            res.send(err);
        else
            res.json(trainings);
    });
};

exports.save = function(name, description){
	var training = new Training({name: name, description: description});

	training.save();
};