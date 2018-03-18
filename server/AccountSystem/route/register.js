var express = require('express');
var router = express.Router();
var identity = require('../entity/identity');
//Refer to online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s
router.post('/register', function(req, res){
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var checkPassword = req.body.checkPassword;
    var user = new identity.userIdentity(email, username, password);
    user.checkPassword = checkPassword;

    var validate = identity.regValidate(req, user, (result) => {
        if(!result.isEmpty()){
            throw result;
        } else {
            identity.createUser(user, function(err, user){
                if(err) throw err;
            })

            //Hint message!!
            //Following operations
        }
    });
});

module.exports = router;
