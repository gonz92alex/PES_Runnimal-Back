'use strict';

var Users = require('../../models/users');
var Pets = require('../../models/pets');

exports.list = function(req, res){
	Users.getAll().then(function (users){
		return res.render('admin/users/userslist', {'users': users});
	}).catch(function (err){

	});
}

exports.view = function(req, res){
	Users.getOneById(req.params.id).then(function (user){
		Pets.getUserPets(user.email).then(function(pets){
			return res.render('admin/users/view', {'user': user, 'pets': pets});
		}).catch(function (err){

		});
	}).catch(function (err){

	});
}

exports.edit = function(req, res){
	return res.send(req.body);
}

exports.newForm = function(req, res){
	return res.render('admin/users/new');
}

exports.new = function(req, res){
	return res.send(req.params);
	var email = req.params.email;
	var password = req.params.password;
	var alias = req.params.alias;
}