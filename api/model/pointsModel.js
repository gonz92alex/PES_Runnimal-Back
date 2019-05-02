'use strict'; 

var Points = require('../db/Points');

exports.getAll = function(){


    return Points.find(); 
}

exports.getNearTo = function(x,y,maxDist,minDist){
    


    return Points.find({
        coord: 
        {
          $near: [x,y], 
            $minDistance: minDist,
            $maxDistance: maxDist
          }  
    }); 
}

exports.searchByName = function(name){
       
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
   
    return newPoint.save();    
}
exports.deletePoint = function(id){ 
    var id = id.trim();
    return Points.findByIdAndRemove(id);
}


