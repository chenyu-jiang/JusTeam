var connection = require('dbConnection.js');
var bcrypt = require('bcryptjs');

function userIdentity(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.plainPassword = password;
};

var createUser = function(identity, callBack){
    //Refer to example from documentation of bcryptjs
    //Also online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s
    bcrypt.genSalt(20, function(err, salt) {
        if(err) callBack(err, null);
        bcrypt.hash(identity.plainPassword, salt, function(err, hash) {
            if(err) callBack(err, null);
            // Store hash in your password DB.
            identity.hashPassword = hash;
            //Store the information into the database
        });
    });
    //callback
}

async function regValidate(req, checkUser, callBack)
{
    await{
        //Check if the request is empty
    }
    req.checkBody(checkUser.username, 'User name should be longer than 5 characters').notEmpty();
    req.checkBody(checkUser.email, 'Please input valid email account!').isEmail();
    //Other validations

    var result = req.getValidationResult();
    callBack(result);
}

var isUserExist = function(email, callBack){
    var exist = false;
    connection.connect(function(err){
        if(err) throw err;
    });

    var query = 'SELECT id FROM identity WHERE email = \'' + email + '\'';

    connection.query(query, function (err, result, fields) {
        if(err) throw err;
        else{
            if(result.isEmpty()){
                callBack(null, false);
            }
            else{
                callBack(result[0].id, true);
            }
        }
    });
}

var isPasswordMatch = function(id, pwCandidate, callBack){
    var query = 'SELECT password FROM identity WHERE id = ' + id;
    connection.connect(function(err){
        if(err) throw err;
    });
    connection.query(query, function (err, result, fields) {
        if(err) throw err;
        else{
            if(result.isEmpty()){
                callBack(false);
            }
            else{
                bcrypt.genSalt(20, function(err, salt) {
                    if(err) throw err;
                    bcrypt.hash(pwCandidate, salt, function(err, hash) {
                        if(err) throw err;
                        // Store hash in your password DB.
                        //Store the information into the database
                        if(hash == result[0].password) callBack(true);
                    });
                });
            }
        }
    });
}

var loginCheck = function(email, password, callBack) {
    isUserExist(email, (id, exist) => {
        if(!exist) callBack(false, 'User does not exist!');
        else {
            isPasswordMatch(id, password, (match) => {
                if(!match) callBack(false, 'Wrong Password!');
                else callBack(true, 'Valid information!');
            })
        }
    })

}

var checkLog = function(req, next){
    if(req.isLoggedIn) {return next;}
    else {
        //Handle
    }
}

module.exports= {
    userIdentity : userIdentity,
    createUser : createUser,
    regValidate : regValidate,
    loginCheck : loginCheck(),
    checkUser   : checkUser,
    checkPassword: checkPassword()
};