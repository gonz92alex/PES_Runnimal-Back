'use strict';
var Training = require('../models/Training');


exports.list = function(req,res) {
    Training.find(function(err, trainings){
    	if (err)
            res.send(err);
        else
            res.json(trainings);
    });
};

exports.newTrainning = function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var training = new Training(name, description);
        
    training.save(function(err) {
        return res.json(training);
    });


}

exports.save = function(name, description){
	var training = new Training({name: name, description: description});

	training.save();
};