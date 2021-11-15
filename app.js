var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require("http");
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userCredentialsRouter = require('./routes/validateUserCredentials');
var getFriendsList  = require('./routes/getFriendsList');
var singupRouter = require("./routes/newUserSignup");
var isUserLoggedInRouter = require("./routes/isUserLoggedIn");
var logoutUser = require('./routes/logutUser');
var uploadRouter = require("./routes/uploadUserProfilePic")



var app = express();


var server = http.Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name : 'codeil',
  secret : 'something',
  resave :false,
  saveUninitialized: true,
  cookie : {
          maxAge:(1000 * 60 * 100)
  }      
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/user/details', userCredentialsRouter);
app.use('/get/friends/list', getFriendsList);
app.use('/user/register', singupRouter);
app.use('/isUserLoggedIn', isUserLoggedInRouter);
app.use("/logoutUser", logoutUser);
app.use('/upload/userProfilePic', uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
var tdata = {
  tradeData :  [
      {
          'sno': 1,
          'tName': 'Reliance Petrol',
          'company': 'Reliance',
          'sValue': 345.45,
          'pValue': 356.234
      },
      {
          'sno': 2,
          'tName': 'Tata Electronics',
          'company': 'Tata',
          'sValue': 123.45,
          'pValue': 129.523
      },
      {
          'sno': 3,
          'tName': 'Maruthi Cars',
          'company': 'Maruthi',
          'sValue': 13.45,
          'pValue': 23.235
      },
      {
        'sno': 4,
        'tName': 'Ford Cars',
        'company': 'Ford',
        'sValue': 23.12,
        'pValue': 26.235
    },
    {
      'sno': 5,
      'tName': 'Airtel Communications',
      'company': 'Airtel',
      'sValue': 89.45,
      'pValue': 90.235
  }
  ]
}

io.on('connection', (socket) => {
  setInterval(() => {
    var randomIndex = Math.floor(5 * Math.random());
    tdata.tradeData[randomIndex].sValue = tdata.tradeData[randomIndex].sValue + 1.12;
    tdata.tradeData[randomIndex].pValue = tdata.tradeData[randomIndex].pValue + 1.29;
    socket.emit("updatedTdata", JSON.stringify(tdata));
  }, 2000);
});

server.listen(8081, () => {
  console.log("Server is listing at 8081");
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

