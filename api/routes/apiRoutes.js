'use strict';
module.exports = function(app) {

	var users = require('../controllers/userController');
	var training = require('../controllers/trainingController');
	app.set('view engine', 'jade');


	//USERS//
	app.get('/api/users',users.list);

	//TRAININGS//
	app.get('/api/trainings', training.list);
	app.get('/api/trainings/new', function(req, res){
		res.render("newTrainingForm");
	});  
	app.post('/api/trainings/save', function(req, res){
		var name = req.body.name;
		var description = req.body.description;
		
		training.save(name, description);
	});
}

