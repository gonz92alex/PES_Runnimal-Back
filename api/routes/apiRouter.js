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

//#################POINTS#####################
var pointsRouter = require('./apiRouters/points');
router.use("/points", pointsRouter);

//################FRIENDS#####################
var friendsRouter = require('./apiRouters/friends');
router.use('/friends', friendsRouter);

//#############FRIEND_REQUESTS################
var photoRouter = require('./apiRouters/photo');
router.use("/photo", photoRouter);

//##################RANKING###################

var rankingRouter = require('./apiRouters/ranking');
router.use("/ranking", rankingRouter);

//##################RANKING###################

var loginRouter = require('./apiRouters/login');
router.use("/login", loginRouter);

//##################WALKS###################

var walksRouter = require('./apiRouters/walks'); 
router.use("/walks", walksRouter); 

//##################EXPORTS###################

module.exports = router;
