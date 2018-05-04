/**
* Project           : JusTeam/server/AccountSystem
*
* Module name      : identity
*
* Author            : WANG Yuxuan
*
* Date created      : 20180317
*
* Purpose           : This module provides an entry for log out.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180322    WANG Yuxuan      1     Fix the bug on .destroy session.
**/

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
