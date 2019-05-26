var Walks = require('../db/walks');
var Users = require('./users');
exports.getAll = function(){
    return Walks.find(); 
};


exports.getWalksByUserAndDateRange = function (usermail, lowerDate, upperDate){
//Por defecto esta función busca por beginDate de los walks que es un número. De modo 
//Que lo que hay que enviarle para que funcione correctamente es un valor numérico.
    return Users.getOne(usermail).then(user => {
        if(!user) throw "No existe el usuario con email=>: [" + usermail + "].";
            var userid = user._id; 
            return  Walks.find({user: userid, beginDate: {$lt: upperDate, $gt: lowerDate}});
        });
}


exports.getOne = function(id){
    return Walks.findById(id); 
};

exports.getWalksByUserMail = function(usermail){

    return Users.getOne(usermail).then(user => {
    if(!user) throw "No existe el usuario con email=>: [" + usermail + "].";
        var userid = user._id; 
        return  Walks.find({user: userid});
    });
}

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
