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