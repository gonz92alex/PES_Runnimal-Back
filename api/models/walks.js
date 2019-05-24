var Walks = require('../db/walks');

exports.getAll = function(){
    return Walks.find(); 
};



exports.getOne = function(id){
    return Walks.findById(id); 
};

exports.createWalk = function(userid, duration, created,begindate,enddate, walkpoints) {
userid = userid.trim(); 
duration = duration.trim(); 
crated = created.trim(); 

var newWalk = Walks({

    user: userid,
    duration: duration,
    created: created,
    beginDate: begindate,
    endDate: enddate,
    walkpoints: walkpoints
});
return newWalk.save(); 
}; 
