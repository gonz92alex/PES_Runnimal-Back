'use strict';

var Points = require('../../models/points');

exports.list = function(req, res){
	var alert = req.query.alert;

	Points.getAll().then(function (points){
		return res.render('admin/points/list', {'points': points, 'alert': alert});
	}).catch( function(err){
		return res.send(err);
	});
}

exports.new = function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	var type = req.body.type;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;

	Points.newPoint(title, description, type, "", new Array(latitude, longitude))
	.then(function (point){
		return res.redirect('/admin/points?alert=newPoint');
	}).catch(function(err){
		return res.send(err);
	});
}

exports.actionPoints = function(req, res){
	var id = req.params.id;
	var action = req.query.action;

	if( action == "delete"){
		Points.deletePoint(id).then(function(point){
			return res.redirect('/admin/points?alert=pointDeleted');
		}).catch(function(err){
			return res.send(err);
		});
	}
}