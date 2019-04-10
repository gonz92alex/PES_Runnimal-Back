'use strict'; 

var Points = require('../db/Points');

exports.getAll = function(){
    return Points.find(); 
}

exports.newPoint = function(title, description, type, photo_url, coord){
    title = title.trim(); 
    type = type.trim(); 
    description = description.trim();  
    photo_url = photo_url.trim(); 
    

    var newPoint =  new Points({
        title: title,
        type: type,
        description: description,
        photo_url: photo_url,
        coord: coord
    });
    newPoint.save() //Añadir gestión de errores. 

    return newPoint; 
}