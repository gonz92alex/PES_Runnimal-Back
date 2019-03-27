'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');
  var pets = require('../controllers/petController');

  var users = require('../controllers/userController');
  var training = require('../controllers/trainingController');
  //app.set('view engine', 'jade');

  app.get('/api/users',users.list);
  app.post('/api/users',users.newUser);
  app.put('/api/user/:email',users.editUser); 
  app.get('/api/user/:email', users.getOne);
  app.delete('/api/user/:email', users.deleteOne);
  app.get('/api/pets',pets.list);
  app.post('/api/pets', pets.newPet);
  app.put('/api/pets/:owner/:name', pets.editPet)
  app.get('/api/pet/:owner/:name', pets.getOne);
  app.delete('/api/pet/:owner/:name', pets.deleteOne);

  //TRAININGS//
  app.get('/api/trainings', training.list);


  /*app.get('/api/trainings/new', function(req, res){
  	res.render("newTrainingForm");
  });*/  
  app.post('/api/trainings', training.newTraining);
}

