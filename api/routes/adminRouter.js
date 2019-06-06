var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");
var session_middleware = require("./sessionMiddleware");

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(session({
	secret:  "runnimalAdminBackOffice",
	resave: false, //la sessió s'ha de tornar a guardar encara que no estigui modificada
	saveUninitialized: false //la sessió s'ha de guardar encara que no estigui inicialitzada
}));

var auth = require("../controllers/admin/authController");

router.route("/")
	.get(auth.renderLogin)
	.post(auth.login);

router.use(session_middleware);

router.route("/logout")
	.get(auth.logout);
	
//##################USERS#####################
var usersRouter = require('./adminRouters/users');
router.use("/users", usersRouter);

//##################PETS######################
var petsRouter = require('./adminRouters/pets');
router.use("/pets", petsRouter);

//###############TRAINNINGS###################
var trainningsRouter = require('./adminRouters/trainnings');
router.use("/trainnings", trainningsRouter);

//#################POINTS#####################
var pointsRouter = require('./adminRouters/points');
router.use("/points", pointsRouter);

module.exports = router;