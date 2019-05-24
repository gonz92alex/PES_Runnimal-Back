var express = require("express");
var bodyParser = require('body-parser');
var session = require("express-session");

var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(session({
	secret:  "runnimalAdminBackOffice",
	resave: false, //la sessió s'ha de tornar a guardar encara que no estigui modificada
	saveUninitialized: false //la sessió s'ha de guardar encara que no estigui inicialitzada
}));

var auth = require("../controllers/admin/authController");

router.route("/login")
	.get(auth.login)
	.post(auth.loginError);

router.post("/processLogin", auth.processLogin);

//##################USERS#####################
var usersRouter = require('./adminRouters/users');
router.use("/users", usersRouter);

//##################PETS######################
var petsRouter = require('./adminRouters/pets');
router.use("/pets", petsRouter);

module.exports = router;