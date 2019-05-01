'use strict'

var Points = require('../model/pointsModel');



exports.list = function(req,res){
    Points.getAll().then(function(points){
        return res.json(points);
    }).catch(function(err){
        return res.json({'error':err});
    });
}


exports.newPoint = function(req,res){
    var title = req.body.title; 
    var description = req.body.description; 
    var type = req.body.type; 
    var photo_url = req.body.photo_url; 
    var coord = req.body.coord; 
    if (!title) return res.status(400).send("Bad request, no title provided");
    if (!type) return res.status(400).send("Bad request, no title provided");
    if (!coord) return res.status(400).send("Bad request, no coord provided"); 
   /*
        Es importante hacer así 
        el error handling puesto
        que de otra forma no se gestionan
        apropiadamente los mensajes de error.
   */
    Points.newPoint(title,
        description,
        type,               
        photo_url,
        coord)
            .then(function(newPoint){ 
                return res.json(newPoint);
            }).catch(function (err){
                return res.status(400).send(err);
            });
   
}

exports.delete = function(req,res){
    var id = req.params.id.trim(); 
    Points.deletePoint(id).then(function(deletedPoint){ 
        if(deletedPoint) return res.json(deletedPoint);
        return res.status(404).json("Point with ID " + id +  " not found");
        }).catch(function (err){
            return res.status(400).json(err);
        });
}