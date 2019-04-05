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

var  indexRoutes = require('./app/routes/indexRoutes');
var  apiRoutes = require('./api/routes/apiRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));

app.use('/', indexRoutes);
apiRoutes(app);


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
