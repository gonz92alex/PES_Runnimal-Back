'use strict';
var Users = require('../db/users');
var Tokens = require('../db/tokens');
var ObjectId = require('mongodb').ObjectID;
/*
token = new Token()
            crypto.createHash('md5').update(user._id).digest("hex");*/

exports.createOrReturn = function(alias, email, password) {
    return Users.findOne({'email':email}).then((user) => {
        console.log('uuu')
        console.log(user)
        if (user) {
            return Tokens.findOne({'user':ObjectId(user._id)})
        }            
        else {
            var usr = new Users({
                'alias': alias,
                'email': email,
                'password': password
            });
            console.log('ei')
            return usr.save(function (err, usr_c) {
                console.log('hola')
                console.log(err)
                if (err) return handleError(err);
                var tkn = new Tokens({'token': new Date().getMilliseconds().toString()+usr_c._id, 'user': usr_c})
                return tkn.save();
            });
        }
    }).catch(err=>{
        return {'error':err};
    });        
};


exports.getOne = function(email, password) {
    return Users.findOne({'email': email, 'password':password}).then(user=>{
        if (user){
            return Tokens.findOne({'user':ObjectId(user._id)})
        }
        else{
            return {'error':"User doesn't exists"};
        }
    }).catch(err=>{
        return {'error':err};
    });
};


exports.getUser = function(token) {
    return Tokens.findOne({'token': token}).populate({ path: 'user', select: 'email alias' })
};

exports.createToken = function(email, password){
    return Users.findOne({'email': email, 'password':password}).then(user=>{
        if (user){
            var tkn_str = new Date().getMilliseconds().toString()+user._id;
            console.log(tkn_str)
            var tkn = new Tokens({'token': tkn_str, 'user': user});
            return tkn.save();
        }
        else{
            return {'error':"User doesn't exists"};
        }
    }).catch(err=>{
        return {'error':err};
    });
}