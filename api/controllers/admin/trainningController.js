'use strict';

var Trainnings = require('../../models/trainning');

exports.list = function(req, res){

	var alert = req.query.alert;

	Trainnings.getAll().then(function (trainnings){
		return res.render('admin/trainnings/list', {'trainnings': trainnings, 'alert': alert});
	}).catch( function(err){
		return res.send(err);
	});
}

exports.view = function(req, res){

	var id = req.params.id;
	var action = req.query.action;
	var alert = req.query.alert;

	if (action == "delete"){
		Trainnings.delete(id).then(function (trainning){
			return res.redirect('/admin/trainnings?alert=trainningDeleted');
		}).catch(function (err){

		});
	} else {
		Trainnings.getOneById(id).then(function (trainning){
			return res.render('admin/trainnings/view', {'trainning': trainning, 'alert': alert})
		}).catch(function(err){
			return res.send(err);
		});
	}

}

exports.new = function(req, res){
	var name = req.body.name;
	var description = req.body.description;
	var language = req.body.language;

	Trainnings.new(name, description, language).then(function (trainning){
		return res.redirect('/admin/trainnings?alert=newTrainning');
	}).catch(function (err){
		return res.send(err);
	});
}

exports.edit = function(req, res){
	console.log("editing trainning");
	var id = req.body.id;
	var name = req.body.name;
	var description = req.body.description;
	var language = req.body.language;

	Trainnings.edit(id, name, description, language).then(function (trainning){
		return res.redirect('/admin/trainnings/' + id + "?alert=trainningEdited");
	}).catch(function (err){
		return res.send(err);
	});
}

exports.addStep = function(req, res){
	return res.send("hola")
}

exports.actionSteps = function(req, res){
	var id = req.params.id;
	var action = req.query.action;
	var step = req.query.step;

	Trainnings.removeStep(id, step).then(function (trainning){
		return res.redirect('/admin/trainnings/' + id + "?alert=stepRemoved")
	}).catch(function(err){
		return res.send(err);
	})
}