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
    var username = req.body.userID;
    var password = req.body.password;
    identity.getEmailFromUsername(username, (err, email) => {
        if(err) res.send(JSON.stringify({loginState: false, loginError: err}));
        else{
            if(email.length == 0) res.send(JSON.stringify({loginState: false, loginError: 'Cannot find the user'}));
            req.body.email = email.email;
            passport.authenticate('local', function(err, user, info){
                console.log("Success check!");
                if(err) throw err;
                if(!user){
                    return res.redirect('/login');
                }

                req.login(user, function(err){
                    //console.log("Session biuld!");
                    if(err) throw err;
                    return res.send(JSON.stringify({loginState: true}));
                });
            })(req, res); //From website of the passport.js
        }
    });




});

module.exports = router;

