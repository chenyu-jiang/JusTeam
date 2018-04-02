var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var local = require('passport-local').Strategy;

router.post('/', function(req, res){
    if (req.session != undefined) {
        req.session.destroy(function (err) {
            if (err) res.send(JSON.stringify({error: err}));
            //res.redirect('/login');
            try {
                req.logout();
            } catch (err) {
                res.send(JSON.stringify({error: err}));
            }

        });
    }
    try {
        req.logout();
    } catch (err) {
        res.send(JSON.stringify({error: err}));
    }

});

module.exports = router;