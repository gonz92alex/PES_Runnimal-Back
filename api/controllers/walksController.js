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

exports.getwalk = function(req,res){
    var id = req.params.id; 
    Walks.getOne(id).then(walk => {
        return res.json(walk); 
    }).catch(err => {
        return res.status(400).json({'error':err}); 
    });
}

exports.getUserWalks = function(req,res){
    var usermail = req.params.email; 
    var lowerDate = req.query.lowerDate; //El query recoge los parámetros directamente del HTTP header.
    var upperDate = req.query.upperDate;


    if(lowerDate && upperDate){
        
        Walks.getWalksByUserAndDateRange(usermail,lowerDate,upperDate).then(walks => {
            if(walks.length > 0){
                return res.status(200).json(walks); 
            } else{
                return res.status(404).send({'error':"No walks found"}); 
            }
        }).catch(err => {
            return res.status(404).json({'error':err}); 
        }); 

    } else {
        Walks.getWalksByUserMail(usermail).then(walks => {
            if(walks.length > 0){
                return res.status(200).json(walks); 
            } else{
                return res.status(404).send({'error':"No walks found"}); 
            }
        }).catch(err => {
            return res.status(404).json({'error':err}); 
        }); 
    }


   
}

exports.createWalk = function (req,res){
    var usermail = req.body.usermail; 
    var title = req.body.title;
    var duration = req.body.duration;
    var distance = req.body.distance; 
    var created = req.body.created; 
    var beginDate = req.body.start; 
    var endDate = req.body.end; 
    var walkpoints = req.body.route;  
    if(!usermail) return res.status(400).send("User Mail required"); 
    if(!title) return res.status(400).send("Title Required");
    if(!duration) return res.status(400).send("Duration Required");
    if(!distance) return res.status(400).send("Distance required"); 

    return Walks.createWalk(usermail,title,duration,distance, created,beginDate,endDate,walkpoints)
            .then(walk => {
        return res.status(200).json(walk); 
    }).catch(function(err){
        return res.status(400).json({'error':err});
    }); 
}

exports.deleteWalk = function(req,res){
    var walkid = req.params.id; 

    return Walks.deleteWalk(walkid).then(walk =>{
        return res.status(200).json({'deleted':walk}); 
    }).catch(function(err){
        return res.status(400).json({'error':err});
    });
}