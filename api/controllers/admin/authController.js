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
			/*bcrypt.compare(password, usr.password).then(function(res){

			})*/
			if(user.role == "admin"){
				req.session.user = user;
				console.log("hem arribat");
				console.log(req.session.user);
				return res.redirect('/admin/users/');
				//return res.send(req.session.user);
				//return res.send(user);
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