var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helmet = require('helmet');
const cors = require('cors');
var logger = require('morgan');
var passport = require('passport');
const Sequelize = require('sequelize');

let CONFIG = require('./config')

var app = express();
app.use(cors())
app.use(helmet())


require('./models/connect')

var authRouter = require('./routes/auth')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)

app.use(function(req, res, next) {
  return res.status(404).json({
    status: 'error',
    error: '404 Not Found'
  })
});
  
  // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.json({
    status: 400,
    error: err.message
  })
});
  
  module.exports = app;
