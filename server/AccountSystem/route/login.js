var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var passport = require('passport');
var Local = require('passport-local').Strategy;

//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s
passport.use(new Local(
    function(email, password, done) {
        try{
            identity.loginCheck(email, password, (check, message) => {
                if(!check){
                    return done(null, false, {
                        message: message
                    });
                }
                else{
                    return done(null, true);
                }
            })
        }
        catch{
            //Catch the error from verification failure.
        }
    } //Referred to Example of http://www.passportjs.org/docs/configure/
));

router.post('/login', function(req, res){
    var username = req.username;
    var password = req.password;
    var remember = true;

    passport.authenticate('local', { successRedirect: '/' + username,
        failureRedirect: '/login',
        failureFlash: true }, function(err, state, info){
        if(err) throw err;
        if(!state){
            return res.redirect('/login');
        }

        req.login(state, function(err){
            if(err) throw err;
        }, function (){
            //After done
        });

    }); //From website of the passport.js

})

