'use strict';
var Users = require('../db/users');
var Friends = require('./usersRelationships'); 
var CompletedTrainnings = require('../db/completedtrainnings'); 

exports.getAll = function() {
    return Users.find();
};

exports.getRanking = function (){
  return  Users.find({}).sort({points: -1}).then(function(users,err){
        if(err){
            return {'error' : err}
        } else {
            return users; 
        }
    });
}

exports.getRankingByFriends = function(userEmail){
     return  Friends.userFriends(userEmail).then(function(friends){
        var idSet = [];
        friends.forEach(function(friend){           
         
            var userId1 = friend.user1; 
            var userId2 = friend.user2;
            console.log(userId1);
            console.log(userId2);
            idSet.push(userId1);
            idSet.push(userId2);        
        });
        return idSet;
    }).then(function(idSet){
        
        return Users.find( {_id: {$in: idSet}}).sort({points: -1}).then(users => {
            console.log("buscando usuarios");

            console.log(users);
            return users; 
        }).catch(err => {
            return ({'error':err});
        })
         
    });

  
}

exports.numCompletedTrainningsByUser = function(usermail){
   return this.completedTrainningsByUser(usermail).then(ctraings => {
        var totaltraings = 0;    
    ctraings.forEach(function(traing){
        totaltraings += traing.timescompleted; 
        }); 
        return totaltraings; 
    });
}


exports.completetrainning = function(email, trainningid){
    return this.getOne(email).then(user => {   
        return user._id; 
    }).then(userid => {

    return CompletedTrainnings.findOne({user: userid, trainning: trainningid}).then(completedtrainning => {
            if(completedtrainning){
                this.addPoints(email, 10); 
                completedtrainning.timescompleted++; 
                return completedtrainning.save(); 
            } else {
                this.addPoints(email, 50); 
                var ctraing = new CompletedTrainnings({
                    user: userid, 
                    trainning: trainningid,
                    timescompleted: 1
                        });
                return ctraing.save(); 
                }
        });
    }); 
}

exports.completedTrainningsByUser = function (email){
   return this.getOne(email).then(user =>{
    return CompletedTrainnings.find({user: user._id}); 
    }); 
}

exports.createUser = function(alias, email, password, role = "admin") {
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
                password: password,
                role: role
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

exports.changeRole = function(email, newRole){
    return this.getOne(email).then(user=>{
        user.role = newRole; 
        return user.save();
    }).catch(err=>{
        return {'error': err};
    });
}

exports.resetPassword = function(userId){
    return this.getOneById(userId).then(user=>{
        user.password = user.alias; 
        return user.save();
    }).catch(err=>{
        return {'error': err};
    });
}

exports.addPoints = function(email,pointsQuantity){
   return this.getOne(email).then( user =>  {
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
                 console.log(user); 
                return user.save(); 
            }
        }
    });
}
exports.removePoints = function(email,pointsQuantity){
   return this.getOne(email).then(user =>  {
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
    //email = email.trim();
    return Users.findOne({'email': email});
};

exports.getOneById = function(id) {
    return Users.findById(id).then(user => {
        console.log("Se ha llamado al getOneById");
        return user; 
    }).catch(err=> {
        return {'error':err};
    });
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

exports.deleteOneById = function(id) {
    return Users.remove({_id: id});
}