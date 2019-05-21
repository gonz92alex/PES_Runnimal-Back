var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env_vars = require('./bin/config-env').config();
var dburl = env_vars["DBURL"];
var dbschema = env_vars["DBSCHEMA"];
var dbuser = env_vars["DBUSER"];
var dbpassw = env_vars["DBPWD"];
var mongoConnect = 'mongodb://'+dbuser+':'+dbpassw+'@'+dburl+'/'+dbschema;
mongoose.connect(mongoConnect, { useNewUrlParser: true }).catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

var  indexRoutes = require('./routes/indexRoutes');
//var  apiRoutes = require('./api/routes/apiRoutes');
var apiRouter = require('./api/routes/apiRouter');
var adminRouter = require('./api/routes/adminRouter');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
//apiRoutes(app);

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
