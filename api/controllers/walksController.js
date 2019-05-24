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
    var usermail = req.body.usermail; 
    var duration = req.body.duration;
    var distance = req.body.distance; 
    var created = req.body.created; 
    var beginDate = req.body.begindate; 
    var endDate = req.body.endDate; 
    var walkpoints = req.body.walkpoints;  
    if(!usermail) return res.status(400).send("User Mail required"); 
    if(!duration) return res.status(400).send("Duration Required");
    if(!distance) return res.status(400).send("Distance required"); 

    return Walks.createWalk(usermail,duration,distance, created,beginDate,endDate,walkpoints)
            .then(walk => {
        return res.status(200).json(walk); 
    }).catch(function(err){
        return res.status(400).json({'error':err});
    }); 
}