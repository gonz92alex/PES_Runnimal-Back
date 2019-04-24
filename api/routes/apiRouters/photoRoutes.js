 var photo = require('../../controllers/photoController');
 var photos = require('../models/photoModel');

 exports.routes = function(app){
    var routes = app.router;
    routes.router('/user/:email')
      .post(photos.uploadProfile)
      .get(photo.getUser);


 }
 /*
 // Photos
 app.post('/user/:email',  upload.single('profile'), photo.uploadUser);
 app.post('/pet/:owner/:name', upload.single('profile'), photo.uploadPet);
 app.get('/user/:email', photo.getUser);
 app.get('/pet/:owner/:name', photo.getPet);*/