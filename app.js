var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var setupRouter = require('./routes/setup');
var activityRouter = require('./routes/activity');

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
app.use('/setup', setupRouter);
app.use('/activity', activityRouter);

//Load the Config.json file
var configjson  = require('./public/config.json');
app.get( '/config.json', function( req, res ) {
  
  var activityName = 'ACTIVITY_NAME';
  //Clone the config.json file
  var json = JSON.parse(JSON.stringify(configjson));
  var search = new RegExp('{{'+activityName+'}}', 'g');
	json.lang['en-US'].name = configjson.lang['en-US'].name.replace(search,process.env[activityName]);
  
  //send the updated JSON
  res.status(200).send( json );
});

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



module.exports = app;
