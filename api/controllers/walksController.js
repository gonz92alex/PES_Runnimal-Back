var Walks = require('../models/walks');


exports.createWalk = function (req,res){

    var userid = req.body.userid; 
    var duration = req.body.duration;
    var distance = req.body.distance; 
    var beginDate = req.body.begindate; 
    var endDate = req.body.endDate; 
    var walkpoints = req.body.walkpoints;  


console.log(walkpoints); 

return res.status(200).send("Holaaa");


}