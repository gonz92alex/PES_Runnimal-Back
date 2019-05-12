'use strict';
var Users = require('../db/users');


exports.getAll = function(req,res) {
    return Users.find();
};

exports.createUser = function(alias, email, password) {
    alias = alias.trim();
    email = email.trim();
    password = password.trim();
    return this.getOne(email).then((user) => {
        if (user) {
            return {'error': 'User already exists'};
        }            
        else {
            var usr = new Users({
                alias: alias,
                email: email,
                password: password
            });
            return usr.save();
        }
    }).catch(err=>{
        return {'error':err};
    });        
};

exports.editAlias = function(email, alias){
    return this.getOne(email).then(user=>{
        user.alias = alias; 
        return user.save();
    }).catch(err=>{
        return {'error': err};
    });
}

exports.addPoints = function(email,pointsQuantity){
    this.getOne(email).then( function(user) {
        if(!user){
            console.log("Usuario no existe");
            return {'error': 'User do not exists'};
        } else {
            if(!user.points){
                console.log("Usuario existe y no tiene puntos");

                user.points = pointsQuantity; 
                return user.save(); 
            } else{

                console.log("Usuario existe y tiene puntos " + user.points);

                user.points = user.points + pointsQuantity; 
                 
                return user.save(); 
            }
        }
    });
}
exports.removePoints = function(email,pointsQuantity){
    this.getOne(email).then(function(user)  {
        if(!user){
            return {'error': 'User do not exists'};
        } else {
            if(!user.points){
                return {'error': 'User has no points'};
            } else{
                user.points = user.points - pointsQuantity; //Un usuario puede tener puntos negativos. 
                return user.save(); 
            }
        }
    }).catch(err=>{
        return {'error':err};
    });

}

exports.getOne = function(email) {
    email = email.trim();
    return Users.findOne({'email': email});
};

exports.getOneById = function(id) {
    return Users.findById(id);
}

exports.deleteOne = function(email) {
    return this.getAll(email).then(user=>{
        return Users.remove({_id:user._id}).then(res=>{
            if (res){
                console.log(res);
                if (res['ok'] == 1) return {'result':'OK'};
                else return {'result':'KO'};
            }
        });
    }).catch(err=>{
        return {'error':err};
    });
};