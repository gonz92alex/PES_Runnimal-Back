'use strict';

var Users = require('../../models/users');

exports.renderLogin = function(req, res){
	var error = req.query.error;
	return res.render("admin/login", {error: error});
}

exports.login = function(req, res){
	
	/*comprovar si el usuari y la contraseña son correctes*/
	Users.getOne(req.body.email).then(function(user){
		if(user) {
			//Falta comprovar la contrassenya
			/*bcrypt.compare(password, usr.password).then(function(res){

			})*/
			if(user.role == "admin"){
				req.session.user = user;
				return res.redirect('/admin/users/');
			} else {
				return res.redirect('/admin?error=noPermissions');	
			}
		} else {
			return res.redirect('/admin?error=userDontExists');
		}


	}).catch(function(err){

	});
}

exports.logout = function(req, res){
	req.session.destroy();
	return res.redirect("/admin");
}