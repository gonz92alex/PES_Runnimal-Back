'use strict';

var Trainning = require('../db/trainning');
var ObjectId = require('mongodb').ObjectID;

exports.getAll = function() {
	return Trainning.find();
}

exports.getAllByLanguage = function(language){
	return Trainning.find({language : language});
}

exports.new = function(name, description, language) {
	var trainning = new Trainning({
        name: name,
        description:description,
        language: language
    });
    
    return trainning.save();
}

exports.edit = function(id, name, description, language) {
	return this.getOneById(id).then(function (trainning){
		trainning.name = (!name) ? trainning.name : name;
		trainning.description = (!description) ? trainning.description : description;
		trainning.language = (!language) ? trainning.language : language;

		return trainning.save();
	}).catch(function (err){

	});
}

exports.addStep = function(id, newStep){
	return this.getOneById(id).then(function (trainning){
		trainning.steps.push(newStep);
		return trainning.save();
	})
}

exports.removeStep = function(id, step){
	return this.getOneById(id).then(function (trainning){
		var index = trainning.steps.indexOf(step);
        if(index > -1){
            trainning.steps.splice(index, 1);
            return trainning.save();
        } else {
            return trainning;
        }
	}).catch(function (err){

	});
}

exports.getOneById = function(id){
	return Trainning.findById(id);
}

exports.delete = function(id){
	return Trainning.findByIdAndDelete(id)
}