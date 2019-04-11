var mongoose = require('mongoose');
var userController = require('./userController');
var Users = require('../models/Users');
var service = require('./services');

exports.emailSignup = function(req, res) {
    userController.newUser(req, res);

    if(res.status == 200){
        token = service.createToken(res.json);
        res.send({token: token});
    }

    /*var user = new User({
    	// Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });
    
    user.save(function(err){
    	return res
    		.status(200)
        	.send({token: service.createToken(user)});
    });*/
};

exports.emailLogin = function(req, res) {

    var email = req.body.email;
    
    //var answer = userController.getOne(req, res, email);

    if (!email) return res.status(432).send("Bad request, no email provided");
    
    email = email.trim();
    Users.findOne({'email': email}).exec((err,user) => {
        if (err)
            return res.send(err);
        else {
            var token = service.createToken(user);
            return res
                .status(200)
                .send({token: service.createToken(user)});
        }
    });
};