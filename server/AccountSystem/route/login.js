var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var Local = require('passport-local').Strategy;

//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s
passport.use(new Local({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        console.log("Start checking!");
        try{
            identity.loginCheck(email, password, (user, message) => {
                if(!user){
                    return done(null, false, {
                        message: message
                    });
                }
                else{
                    return done(null, user);
                }
            });
        } catch (err){
            return done(err);
        }
    } //Referred to Example of http://www.passportjs.org/docs/configure/
));

router.post('/', function(req, res){
    if(req.user != undefined) return res.send(JSON.stringify({loginState: false, error: 'User has logged in'}));
    var username = req.body.userID;
    var password = req.body.password;
    identity.getEmailFromUsername(username, (err, email) => {
        if(err) res.send(JSON.stringify({loginState: false, error: err}));
        else{
            if(email.length == 0) res.send(JSON.stringify({loginState: false, error: 'Cannot find the user'}));
            req.body.email = email.email;
            passport.authenticate('local', function(err, user, info){
                //console.log("Success check!");
                if(err) throw err;
                if(!user){
                    return res.send(JSON.stringify({loginState: false, error: 'username is not exist or password mismatch!'}));
                }

                req.login(user, function(err){
                    //console.log("Session biuld!");
                    if(err) return res.send(JSON.stringify({loginState: false, error: err}));
                    //return res.send(JSON.stringify({loginState: true}));
                    //return res.send(JSON.stringify({loginState: true}));
                    if ( req.body.remember ) {
                        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
                    } else {
                        req.session.cookie.expires = false;
                    }
                    return res.send(JSON.stringify({loginState: true}));
                });
            })(req, res); //From website of the passport.js
        }
    });
});

module.exports = router;