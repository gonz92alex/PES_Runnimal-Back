'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');


  app.get('/api/users',users.list);
  app.post('/api/users',users.newUser);

}

