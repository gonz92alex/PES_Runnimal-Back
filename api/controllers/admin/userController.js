'use strict';

var Users = require('../../models/users');
var Pets = require('../../models/pets');

exports.list = function(req, res){

	var action = req.query.action;

	Users.getAll().then(function (users){
		return res.render('admin/users/userslist', {'users': users, 'action': action});
	}).catch(function (err){

	});
}

exports.view = function(req, res){

	var userId = req.params.id;
	var action = req.query.action;

	if (action == "delete") {
		Users.deleteOneById(userId).then( function (user){
			return res.redirect("/admin/users?action=deleteUser");
		}).catch( function (err){
			return res.send("error al eliminar usuari per id");
		});
	} else {
		Users.getOneById(userId).then(function (user){
			Pets.getUserPets(user.email).then(function(pets){
				return res.render('admin/users/view', {'user': user, 'pets': pets, 'action': action});
			}).catch(function (err){

			});
		}).catch(function (err){

		});
	}

}

exports.edit = function(req, res){
	return res.send(req.body);
}

exports.newForm = function(req, res){
	return res.render('admin/users/new');
}

exports.new = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var alias = req.body.alias;
	var role = req.body.role;

	Users.createUser(alias, email, password, role)
	.then(function (user){
		return res.redirect('/admin/users?action=newUser');
	}).catch(function (err){

	})
}