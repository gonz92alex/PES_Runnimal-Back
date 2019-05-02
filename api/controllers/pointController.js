'use strict'

var Points = require('../model/pointsModel');



exports.list = function(req,res){
    
    var x = req.query.x; //El query recoge los parámetros directamente del HTTP header. 
    var y = req.query.y; 
    var maxDist = req.query.maxDist; 
    var minDist = req.query.minDist; 
  
    if(!maxDist) maxDist = 10; 
    if(!minDist) minDist = 0;
    if(x && y){ //Si se añaden los parámetros X e Y, se busca por cercanía. Por defecto maxDistance es 10. minDistance por defecto es 0. 
                //Si no se ponen X e Y, por defecto obtiene todos los puntos del mapa. 
        console.log("Entra aquí");
        
        Points.getNearTo(x,y,maxDist,minDist).then(function(points){
            console.log("Va bien"); 
            return res.json(points);
        }).catch(function(err){
            console.log("Da error");
            return res.json({'error':err}); 
        });

    } else {
    
            Points.getAll().then(function(points){
                return res.json(points);
            }).catch(function(err){
                return res.json({'error':err});
            });
    }
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