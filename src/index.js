var mongoose = require('mongoose');
var config = require('./config');

var express = require('express');
var bodyParser = require('body-parser');
//var proxyMiddleware = require('http-proxy-middleware');
//var passport = require('passport');

mongoose.connect(config.db);
require('./user/UserSchema'); // init user model

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userController = require('./user/userController');
userController.initApp(app);

//app.use(proxyMiddleware('/api/auth'), {target: 'http://localhost:8082'});
//app.use(proxyMiddleware('/api/data'), {target: 'http://localhost:8083'});
//app.use(proxyMiddleware('/api/game'), {target: 'http://localhost:8084'});

app.listen(config.port);
