'use strict';

var Users = require('../../models/users');

exports.login = function(req, res){
	res.render("admin/login");
}

exports.loginError = function(req, res){

}

exports.processLogin = function(req, res){
	
	/*comprovar si el usuari y la contraseña son correctes*/
	Users.getOne(req.body.email).then(function(user){
		/*req.session.user = user;
		return res.send(req.session.user);*/
		return res.redirect('/admin/users/');
	}).catch(function(err){

	});
}