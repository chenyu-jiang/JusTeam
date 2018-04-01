var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var local = require('passport-local').Strategy;

router.get('/', function(req, res){
    if (req.session != undefined) {
        req.session.destroy(function (err) {
            if (err) res.send(JSON.stringify({logoutError: err}));
            res.redirect('/');
            try {
                req.logout();
            } catch (err) {
                res.send(JSON.stringify({logoutError: err}));
            }

        });
    }
    try {
        req.logout();
    } catch (err) {
        res.send(JSON.stringify({logoutError: err}));
    }

});

module.exports = router;

