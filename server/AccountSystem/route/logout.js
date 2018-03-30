var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var local = require('passport-local').Strategy;

router.get('/logout', function(req, res){
    req.logout();
    //Redirect or something else;
})

