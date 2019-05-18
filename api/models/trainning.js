'use strict';

var Trainning = require('../db/trainning');
var ObjectId = require('mongodb').ObjectID;

exports.getAll = function() {
	return Trainning.find();
}

exports.new = function(name, description, steps) {
	var trainning = new Trainning({
        name: name,
        description:description,
        steps: steps
    });
    
    return trainning.save();
}

exports.edit = function(id, name, description, steps) {
	return this.getOneById(id).then(function (trainning){
		trainning.name = (!name) ? trainning.name : name;
		trainning.description = (!description) ? trainning.description : description;
		trainning.steps = (!steps) ? trainning.steps : steps;

		return trainning.save();
	}).catch(function (err){

	})
}

exports.getOneById = function(id){
	return Trainning.findById(id);
}

exports.delete = function(id){
	return Trainning.findByIdAndDelete(id)
}