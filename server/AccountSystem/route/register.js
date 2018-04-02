var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var bodyParser = require('body-parser');
var recommendation = require('../../SearchSystem/recommendation');
//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s

router.post('/', function(req, res){
    console.log("fuck");
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
        if(err) res.send(JSON.stringify({error: err}));
        if(result) return res.send(JSON.stringify({regState:false, error: 'User has already exist'}));
        identity.createUser(user, userInfo, async function(id, err){
            if(err) return res.send(JSON.stringify({regState: false, error: err}));
            else{

                var addResult = await recommendation.addEmptyUser(id);
                res.send(JSON.stringify({regState: true}));
            }
        });
    });
});

module.exports = router;
