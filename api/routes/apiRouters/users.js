var express = require("express");

var users = require('../../controllers/userController');

var usersRouter = express.Router();

usersRouter.get("/new", function(req, res){
	res.render('api/users/new');
})

usersRouter.route("/")
	.get(function(req, res){
		users.list(req, res);
	})
	.post(function(req, res){
		users.newUser(req, res);
	});

usersRouter.route("/:email")
	.get(function(req, res){
		users.getOne(req, res, req.params.email);
	})
	.delete(function(req, res){
		users.deleteOne(req, res, req.params.email);
	});
 
module.exports = usersRouter;

//apiRouter.get('/users',users.list);
//apiRouter.post('/users',users.newUser);
//apiRouter.get('/user/:email', users.getOne);
//apiRouter.delete('/user/:email', users.deleteOne);