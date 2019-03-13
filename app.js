console.log('Reading configuration files...');
const config = require('./config/config.js');
// Read the configuration variables
var PORT  = config.get('server.port');
var DB = config.get('db.host');
// Print some of them just for information
console.log('Read PORT from config: ' + PORT);
console.log('Read Database host DB from config: ' + DB);
/* Models */
//let user = require('./app/models/user');

/* express routing dependency. Add all your modules here */
var express = require('express'),
    app = express(),
    port = PORT,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    engine = require('ejs-blocks')
    //Contribution = require('./app/models/contribution'),

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.text());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');

/* Deployment settings */
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

/* Connect mongoose object mapper to the database (mongoDB must be running) */
mongoose.connect(DB,{ 
    useNewUrlParser: true 
});

// CORS
var cors = require('cors');
app.use(cors());

// Register some dependencies needed for the API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// API implementation routes
var apiRoutes = require('./routes/apiRoutes');
/*
// Session Routing
var passport = require('passport');
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());*/

// Register the routes
//apiRoutes(app);
app.use('/', apiRoutes);


// Register static resources, views folder and view engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start the application
app.listen(PORT);

// All good!
console.log('Runnimal started on port: ' + PORT);
// And ends sometime
module.exports = app




/*
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/
