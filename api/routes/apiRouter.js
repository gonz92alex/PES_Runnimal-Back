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

//#################AUTH#######################
var auth = require('../controllers/authController');
router.post("/auth/signup", auth.emailSignup);
router.post("/auth/login", auth.emailLogin);

//################PRIVATE#####################
var apiMiddleware = require("./middlewares/apiMiddleware");
router.get("/private", apiMiddleware.ensureAuthenticated, function(req, res){
	res.send("Hola ");
});

//##################EXPORTS###################

module.exports = router;
