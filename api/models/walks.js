var Walks = require('../db/walks');
var Users = require('./users');
var WalksStatistics = require('../db/walkStatistics'); 
exports.getAll = function(){
    return Walks.find(); 
};


exports.getWalksByUserAndDateRange = function (usermail, lowerDate, upperDate){
//Por defecto esta función busca por beginDate de los walks que es un número. De modo 
//Que lo que hay que enviarle para que funcione correctamente es un valor numérico.
    return Users.getOne(usermail).then(user => {
        if(!user) throw "No existe el usuario con email=>: [" + usermail + "].";
            var userid = user._id; 
            return  Walks.find({user: userid, start: {$lt: upperDate, $gt: lowerDate}});
        });
}


exports.getUserWalksStatistics = function(usermail){
    return Users.getOne(usermail).then(user => {
        if(!user) throw "No existe el usuario con email=>: [" + usermail + "].";
            var userid = user._id; 
            return  WalksStatistics.findOne({user: userid});
        });
}

exports.updateUserWalkStatistics = function (useremail, totaldistance, totalduration, walksnumber){

    this.getUserWalksStatistics(useremail).then(function(statistics) {
        statistics.totaldistance = totaldistance; 
        statistics.totalduration = totalduration; 
        statistics.walksNumber = walksnumber; 
        console.log(statistics); 
        return statistics.save(); 
    }).catch(err => {
        console.log("Hay un error actualizando las estadisticas:  " + err); 
    });

}

exports.createOrUpdateUserWalksStatistics = function(usermail){
    return this.getUserWalksStatistics(usermail).then(statistics => {        
        if(statistics){
            //TODO Actualizo las estadísticas
            return this.getWalksByUserMail(usermail).then(walks => {
                var walksnumber = 0; 
                var totalduration = 0;
                var totaldistance = 0; 
                walks.forEach(function(walk){
                    walksnumber++; 
                    if(walk.distance)totaldistance = walk.distance + totaldistance; 
                    if(walk.duration)totalduration = walk.duration + totalduration; 
                });     
                console.log("Generando estadisticas con parametros: "); 
                console.log(totaldistance + totalduration + walksnumber); 
                return this.updateUserWalkStatistics(usermail,totaldistance,totalduration,walksnumber); 
            }); 
        } else {
            //Creo las estadísticas si no existen.
            console.log("Wakstat: No hay estadisticas y las creo.");

            return Users.getOne(usermail).then(user => {
                var walksNumber = 0; 
                var totalduration = 0;
                var totaldistance = 0; 
                console.log("Id del usuario" + user._id); 
                var newstatistics = new WalksStatistics({
                    user: user._id,
                    walksNumber: walksNumber,
                    totalduration: totalduration,
                    totaldistance: totaldistance 
                });    
                return newstatistics.save(); 
            }); 
        }
    }).catch(err => {
        throw "Error creando o actualizando estadísticas " + err; 
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
    start: begindate,
    distance: distance, 
    end: enddate,
    route: walkpoints
})
console.log("Un nuevo paseo va a ser creado");
console.log(newWalk);
return newWalk.save(); 

});


};


