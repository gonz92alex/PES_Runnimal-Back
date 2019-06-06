'use strict';
var Users = require('../models/users');

exports.list = function(req,res) {
    Users.getAll().then(function(users){
        return res.json(users);
    }).catch(function(err){
        return res.json({'error':err});
    });
};

exports.ranking = function(req,res){
    Users.getRanking().then(function(users){
        return res.json(users)
    }).catch(function(err){
        return res.json({'error':err}); 
    });
}

exports.filteredRanking = function(req, res){
    var email = req.params.email; 
  Users.getRankingByFriends(email).then(users => {
      return res.json(users);
  }).catch(function(err ){
  return res.json({'error': err})
    }); 
   
}


exports.newUser = function(req,res) {
    var alias = req.body.alias;
    var email = req.body.email;
    var password = req.body.password;
    if (!alias) return res.status(400).send("Bad request, no alias provided");
    if (!email) return res.status(400).send("Bad request, no email provided");
    if (!password) return res.status(400).send("Bad request, no password provided");
    alias = alias.trim();
    email = email.trim();
    password = password.trim();
    Users.createUser(alias, email, password).then(user => {
        return res.json(user);
    }).catch(err => {
        res.status(400).send(err);
    });
};



exports.editUser = function(req,res){
    var email = req.params.email; 
    var alias = req.body.alias;
    if(!email) return res.status(432).send("Bad request, no email provided");
    if (req.user.email != email && req.user.role != 'admin') return res.status(403).send("Can't edit other user");
    if (alias){
        alias = alias.trim(); 
        Users.editAlias(email, alias).then(user=>{
            return res.json(user);
        }).catch(err=>{
            return res.status(400).send(err);
        })
    } 
};

exports.addPointsToUser = function (req,res){
    var email = req.params.email; 
    var points = req.body.points; 


    if(!email) return res.status(432).send("Bad request, no email provided");
    if(!points) return res.status(432).send("Bad request, no points provided"); 
    if (req.user.email != email && req.user.role != 'admin') return res.status(403).send("Can't obtein points from other user");
    console.log("Obtiene los puntos"); 
    if(points){
    console.log("Existen puntos"); 
        Users.addPoints(email,points).then(user => {
            return res.json(user); 
        }); 
        
    }
}

exports.removePointsToUser = function (req, res){

    var email = req.params.email; 
    var points = req.body.points; 

    if(!email) return res.status(432).send("Bad request, no email provided");
    if(!points) return res.status(432).send("Bad request, no points provided"); 
    if (req.user.email != email && req.user.role != 'admin') return res.status(403).send("Can't remove points to other user");
    console.log("Obtiene los puntos"); 
    if(points){
    console.log("Existen puntos"); 
        Users.removePoints(email,points).then(user => {
            console.log("Llama a removePoints"); 
            
            return res.json(user); 
        }).catch(err=>{
            console.log("Da Error"); 

            return res.status(400).send(err);
        });
        }
}


exports.getOne = function(req,res) {
    var email = req.params.email;
    if (!email) return res.status(430).send("Bad request, no email provided");
    
    email = email.trim();
    Users.getOne(email).then((user) => {
        if (user) res.json(user);
        else return res.status(404).send("User doesn't exists");
    }).catch(err=>{
        return res.status(400).send(err);
    });
};

exports.getOneById = function(req, res){
    var id = req.params.id;
    if (!id) return res.status(400).send("Bad request, no id provided");

    return Users.getOneById(id).then(result => {
        return res.json(result);
    }).catch(err => {
        return res.status(400).send(err);
    });
}

exports.deleteOne = function(req,res) {
    var email = req.params.email;
    if (!email) return res.status(432).send("Bad request, no email provided");
    if (req.user.email != email && req.user.role != 'admin') return res.status(403).send("Can't delete other user");
    email = email.trim();
    Users.deleteOne(email).then(result=>{
        return res.json(result);
    }).catch(err=>{
        return res.status(400).send(err);
    });
};

exports.completeTrainning = function (req, res){
    var email = req.params.email; 
    var trainid = req.params.trainningid;    
    return Users.completetrainning(email, trainid).then(ctraing => {
        if(!ctraing) return res.status(500).send("Error, no se ha podido completar el entrenamiento."); 
        return res.status(200).json(ctraing); 
    }).catch(err => {
        return res.status(500).send({'error':err}); 
    }); 
}

exports.getCompletedTrainnings = function (req, res ){
    var email = req.params.email; 
    var action = req.query.action; 

        if(action == "statistics"){
            return Users.numCompletedTrainningsByUser(email).then(num =>{
                return res.status(200).json({'user':email,'completedTrainnings':num})
            })
        } else {
     


        return Users.completedTrainningsByUser(email).then(ctraings => {
        if(ctraings.length <= 0) return res.status(400).send("El usuario " + 
                                                            email + " no ha completado ningún entrenamiento"); 
        return res.status(200).json(ctraings); 
    }).catch(err => {
        return res.status(500).send({'error':err}); 
    })
}
}
