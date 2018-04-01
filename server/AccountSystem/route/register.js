var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var bodyParser = require('body-parser');
//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s

router.post('/', function(req, res){
    var email = req.body.email;
    var username = req.body.userID;
    var password = req.body.password;
    //var checkPassword = req.body.checkPassword;
    var user = new identity.userIdentity(username, email, password);
    user.checkPassword = req.body.checkPassword;

    var userInfo = new identity.userInformation(req.body.phone, req.body.institution,
        req.body.major, req.body.userID);

    if(password != user.checkPassword) return res.send({regState: false});
    identity.isUserExist(user.email, (id, result, err) => {
        if(err) res.send(JSON.stringify({err: err}));
        if(result) return res.send(JSON.stringify({regState:false, regReason: 'User has already exist'}));
        identity.createUser(user, userInfo, function(result, err){
            if(err) return res.send(JSON.stringify({regState: false, error: err}));
            else return res.send(JSON.stringify({regState: true}));
        });
    });
});

module.exports = router;
