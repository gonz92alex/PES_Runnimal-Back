'use strict';
var Users = require('../db/users');
var Tokens = require('../db/tokens');
var ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');



exports.signup = function(alias, email, password){
    return Users.findOne({'email':email}).then(usr=>{
        if (!usr){
            let pass = bcrypt.hashSync(password, 10);
            usr = new Users({
                'alias': alias, 
                'email':email,
                'password':pass 
            });
            var tkn_str = new Date().getMilliseconds().toString()+usr._id;
            var date = new Date();
            date.setDate(date.getDate() + 15);
            var tkn = new Tokens({'token': tkn_str, 'user': usr._id, 'duration':date.getMilliseconds()});
            return usr.save().then(function(){
                return tkn.save().then(function(){
                    return tkn;
                }).catch(errT=>{
                    return errT;
                })
            }).catch(errU=>{
                return errU
            })
        }
        else{
            return 'User already exists';
        }
    })
    .catch(err=>{
        return err;
    });
    
}

exports.login = function(email, password){
    return Users.findOne({'email':email}).then(usr=>{
        if (usr){
            return bcrypt.compare(password, usr.password).then(res=>{
                if (res){
                    return Tokens.findOne({'user': ObjectId(usr._id)}).populate({ path: 'user', select: 'email alias' }).then(tkn=>{
                        if (tkn) return tkn;
                        else return 'Token doesn\'t found'
                    }).catch(errT=>{
                        return errT
                    });
                }
                else{
                    return 'Wrong password';
                }
            }).catch(errC=>{
                return errC;
            });
        }
        else{
            return 'User doesn\'t found';
        }
    })
    .catch(err=>{
        return err;
    });
    
}
/*

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
                console.log(err)
                if (err) return handleError(err);
                var tkn = new Tokens({'token': new Date().getMilliseconds().toString()+usr_c._id, 'user': usr_c})
                return tkn.save();
            });
        }
    }).catch(err=>{
        return {'error':err};
    });        
};*/


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
    return Tokens.findOne({'token': token, 'duration': {'$lte': new Date().getMilliseconds()}}).populate({ path: 'user', select: 'email alias' })
};

exports.createToken = function(email, password){
    return Users.findOne({'email': email, 'password':password}).then(user=>{
        if (user){
            var tkn_str = new Date().getMilliseconds().toString()+user._id;
            var date = new Date();
            var duration = date.setDate(date.getDate() + days).getMilliseconds();
            console.log(tkn_str)
            var tkn = new Tokens({'token': tkn_str, 'user': user, 'duration':duration});
            return tkn.save();
        }
        else{
            return {'error':"User doesn't exists"};
        }
    }).catch(err=>{
        return {'error':err};
    });
}