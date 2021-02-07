var createError = require('http-errors');
//test
var express = require('express');
var flash = require('express-flash');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var regisRouter = require('./routes/insert');
var edit_acRouter = require('./routes/edit');
var delete_acRouter = require('./routes/delete');
var bodyParser = require("body-parser");
var cors = require('cors');


var pott = process.env.port || 3120;
var app = require("express")();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//var app = express();

// app.use(session({
//   secret: '161042',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }))
app.use(cors());
// app.use(flash());
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



// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/insert', regisRouter);
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

app.listen(pott, () => { console.log("Server online on http://localhost:" + pott + "/users/user-list"); });

module.exports = app;
