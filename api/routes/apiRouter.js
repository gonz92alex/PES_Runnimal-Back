var express = require("express");
var middleware = require('../middleware');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//##################AUTH###################
var loginRouter = require('./apiRouters/login');
router.use("/login", loginRouter);

//#############PHOTO################
var photoRouter = require('./apiRouters/photo');
router.use("/photo", photoRouter);

//Middleware de login 
router.use(middleware);

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

//##################RANKING###################

var rankingRouter = require('./apiRouters/ranking');
router.use("/ranking", rankingRouter);


//##################EXPORTS###################

module.exports = router;
