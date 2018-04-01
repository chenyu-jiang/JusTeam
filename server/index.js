var express = require("express");
//var passport = require('passport');
var app = express();
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var validator = require('express-validator');
// var identity = require('./AccountSystem/entity/identity');
// var session = require("express-session");

app.use("/api",require("./Router/api"));

var server = app.listen(80);
var instantChat = require("./InstantMessages/SocketApp")(server);
console.log("Server started on port 80.");
