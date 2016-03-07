var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var student = require('./routes/student');
var sample = require('./routes/sample');

var app = express();

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/student', student);
app.use('/sample', sample);

// send routing to client
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

module.exports = app;
