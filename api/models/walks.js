var Walks = require('../db/walks');
var Users = require('./users');
exports.getAll = function(){
    return Walks.find(); 
};



exports.getOne = function(id){
    return Walks.findById(id); 
};

exports.deleteWalk = function(id){
    return this.getOne(id).then(walk => {
        
        if(!walk) throw "Error, no existe un paseo con ID-> [" + id +"]."; 
        return Walks.findByIdAndRemove(walk._id); 


    }); 
}

exports.createWalk = function(useremail,title, duration,distance, 
    created,begindate,
    enddate, walkpoints) {

useremail = useremail.trim(); 
return Users.getOne(useremail).then(function (user){	
    if(!user) throw "Error, no existe el usuario";
    var newWalk = new Walks({
    user: user._id,
    title: title,
    duration: duration,
    beginDate: begindate,
    distance: distance, 
    endDate: enddate,
    walkpoints: walkpoints
})
console.log("Un nuevo paseo va a ser creado");
console.log(newWalk);
return newWalk.save(); 

});


}; 
