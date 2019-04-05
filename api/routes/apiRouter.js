var express = require("express");

var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//##################USERS#####################
var usersRouter = require('./apiRouters/users');

router.use("/users", usersRouter);

//###################PETS#####################
var petsRouter = require('./apiRouters/pets');

router.use("/pets", petsRouter);

//###############TRAINNINGS###################
var trainningRouter = require('./apiRouters/trainnings');

router.use("/trainnings", trainningRouter);

//##################EXPORTS###################

module.exports = router;

/*

var apiRouter = express.Router();

apiRouter.use(bodyParser.urlencoded());
apiRouter.use(bodyParser.json());

//USERS


//PETS
apiRouter.get('/pets',pets.list);
apiRouter.post('/pets', pets.newPet);
apiRouter.get('/pet/:owner/:name', pets.getOne);
apiRouter.delete('/pet/:owner/:name', pets.deleteOne);

//TRAININGS//
apiRouter.get('/trainnings', trainning.list);
apiRouter.get('/trainings/new', function(req, res){
	res.render("newTrainingForm");
}); 
apiRouter.get('/trainnings/new', function(req, res){
  console.log(req.body.name);
  res.render('api/newTrainningForm');
}); 

apiRouter.get('/trainnings/editForm', function(req, res){

});
apiRouter.put('/trainnings/edit/:id', function(req, res){
  var id = req.params.id;
});

apiRouter.get('/trainnings/deleteForm', function(req, res){
  var trainnings = trainning.list();

  //console.log(trainnings);
  res.render('api/deleteTrainningForm', { option1: "option 1", option2: "option 2"});
});

apiRouter.post('/trainnings', function(req, res){
  var name = req.body.name;
  var description = req.body.description;

  console.log(name);
  console.log(description);

  //trainning.newTrainning();
});

module.exports = apiRouter;*/
