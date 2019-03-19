'use strict';

var mongoose = require('mongoose').set('debug',true);
var userModel = require('../models/Users');
var Users = mongoose.model('users',userModel);



exports.list = function(req,res) {
    Users.find().exec((err,users) => {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
};

exports.newUser = function(req,res) {
    var alias = req.body.alias;
    var email = req.body.email;
    var password = req.body.password;

    if (!alias) return res.status(400).send("Bad request, no alias provided");
    if (!email) return res.status(432).send("Bad request, no email provided");
    if (!password) return res.status(432).send("Bad request, no password provided");
    
    alias = alias.trim();
    email = email.trim();
    password = password.trim();

    //console.log(alias+', '+email+', '+password)
    Users.findOne({'email': email})
        .exec((err, result) => {
            if (result) {
                return res.json(result);
            }
            else {
                let usr = new Users({
                    alias: alias,
                    email: email,
                    password: password
                });
                usr.save(function(err) {
                    return res.json(usr);
                });
            }
        });
};