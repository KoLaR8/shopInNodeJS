var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var loggedIndexRouter = require('./routes/loggedUser');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var searchRouter = require('./routes/search');
var filtersRouter = require('./routes/filters');
var productsRouter = require('./routes/products');
var loggedproductsRouter = require('./routes/loggedProducts');
var loggedfiltersRouter = require('./routes/loggedFilters');
var cardRouter = require('./routes/card');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {

  if(req.cookies['session'] !== undefined){
    req.is_authorized = true;
  }
  else{
    req.is_authorized = false;
  }
  next();
})
app.use('/', indexRouter);
app.use('/loggedUser', loggedIndexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter );
app.use('/logout', logoutRouter );
app.use('/register', registerRouter );
app.use('/search', searchRouter );
app.use('/filters', filtersRouter );
app.use('/products', productsRouter );
app.use('/loggedProducts', loggedproductsRouter );
app.use('/loggedFilters', loggedfiltersRouter );
app.use('/card', cardRouter );

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
