var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var router = require('./server/router/index');
const passport = require('passport');
const connection = require('./server/util/db');
var logger = require('morgan');

var app = express();

// Init passport (login module)
require('./server/config/passport')();

app.use(logger('dev'));
app.use(express.json());
// use passport session
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/public/index.html');
   //next();
});
router(app);

const PORT = 3000;
app.listen(PORT, function listenToPort() {
	// FIXME: Replace console with logger
	console.log('Express server listening on port ' + PORT);
});
