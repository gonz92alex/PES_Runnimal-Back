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
   var point =  Points.newPoint(title,
        description,
        type,
        photo_url,
        coord) //Hacer gestión de errores 
    
    return res.json(point); 

}

exports.delete = function(req,res){
    var id = req.params.id.trim(); 
          
    Points.deletePoint(id);
          
    return res.status(400);
}