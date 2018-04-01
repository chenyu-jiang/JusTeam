var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var Local = require('passport-local').Strategy;
var passwordHash = require('password-hash');

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
    var email = req.body.email;
    var password = req.body.password;
    var remember = true;



    passport.authenticate('local', function(err, user, info){
        console.log("Success check!");
        if(err) throw err;
        if(!user){
            return res.redirect('/login');
        }

        req.login(user, function(err){
            console.log("Session biuld!");
            if(err) throw err;
            return res.redirect('/register');
        });
    })(req, res); //From website of the passport.js
});

module.exports = router;

