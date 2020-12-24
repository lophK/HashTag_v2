var createError = require('http-errors');
//test
var express = require('express');
var flash = require('express-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var regisRouter = require('./routes/register');
var edit_acRouter = require('./routes/edit');
var delete_acRouter = require('./routes/delete');
var bodyParser = require("body-parser");

var pott = 3120;
var app = require("express")();
var bodyParser = require('body-parser');
//var app = express();

app.use(session({
  secret: '161042',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash());
app.use(expressValidator());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => { res.render("index") });

app.listen(pott, () => { console.log("Server online on http://localhost:" + pott + "/users/user-list"); });
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', regisRouter);
app.use('/edit', edit_acRouter);
app.use('/delete', delete_acRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
