/**
* Project           : JusTeam/server/AccountSystem
*
* Module name      : identity
*
* Author            : WANG Yuxuan
*
* Date created      : 20180317
*
* Purpose           : This module provides a procedure to sign up a new JusTeam account.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180322    WANG Yuxuan      1     Remove bugs on changing the information in database.
* 20180323    WANG Yuxuan      2     Add a callback function in isUserExist function..
**/

var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
var bodyParser = require('body-parser');
var recommendation = require('../../SearchSystem/recommendation');
//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s

router.post('/', function(req, res){
    console.log("fuck");
    var username = req.body.userID;
    var password = req.body.password;
    //var checkPassword = req.body.checkPassword;
    var user = new identity.userIdentity(username, null, password);

    var userInfo = new identity.userInformation(req.body.phone, req.body.institution,
        req.body.major, req.body.userID);

    identity.isUserExist(username, (id, result, err) => {
        if(err) return res.send(JSON.stringify({regstate: false, error: err}));
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
