'use strict';

var Users = require('../../models/users');

exports.list = function(req, res){
	Users.getAll().then(function (users){
		res.render('admin/users/userslist', {'users': users});
	}).catch(function (err){

	});
}