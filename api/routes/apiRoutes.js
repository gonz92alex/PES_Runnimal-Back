'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');


  app.get('/api/users',users.list);
  app.post('/api/users',users.newUser);
  app.get('/api/user/:email', users.getOne);
  app.delete('/api/user/:email', users.deleteOne);

}

