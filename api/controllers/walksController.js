var Walks = require('../models/walks');


exports.list = function(req,res){
 Walks.getAll().then(function(walks){
    if(walks.length > 0){
        return res.status(200).json(walks);
    } else {
        return res.status(404).send("No walks found"); 
    }
 }).catch(function (err){
     return res.status(500).send(err); 
 });

}

exports.createWalk = function (req,res){

    var userid = req.body.userid; 
    var duration = req.body.duration;
    var distance = req.body.distance; 
    var beginDate = req.body.begindate; 
    var endDate = req.body.endDate; 
    var walkpoints = req.body.walkpoints;  
    console.log(walkpoints); //Funciona bien




return res.status(200).json(walkpoints);

}