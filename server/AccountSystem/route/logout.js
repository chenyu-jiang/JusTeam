var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var local = require('passport-local').Strategy;

router.post('/', async function(req, res){
    res.clearCookie('session_cookie_name');
    if (req.session != undefined) {
        await req.session.destroy(function (err) {
            console.log("Session: " + JSON.stringify(req.session));
            if (err) res.send(JSON.stringify({logoutState: false, error: err}));
            //res.redirect('/login');
            try {
                req.logout();
                return res.send(JSON.stringify({logoutState: true}));
            } catch (err) {
                res.send(JSON.stringify({logoutState: false, error: err}));
            }
        });
    }
    else try {
        req.logout();
        return res.send(JSON.stringify({logoutState: true}));
    } catch (err) {
        res.send(JSON.stringify({logoutState: false, error: err}));
    }
});

module.exports = router;
