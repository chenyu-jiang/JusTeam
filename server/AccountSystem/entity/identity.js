var dbCommon = require('../../dbCommon');
var bcrypt = require('bcrypt');
var connection = new dbCommon('account');
var moment = require('moment');
var passwordHash = require('password-hash');

function userIdentity(name, email, password, nickname) {
    this.username = name;
    this.email = email;
    this.plainPassword = password;
};

function userInformation(phone, institution, major, nickname){

    this.phone = phone;
    this.institution = institution;
    this.major = major;
    this.nickname = nickname;
}

var createUser = async function (identity, userInfo, callBack){
    //Refer to example from documentation of bcryptjs
    //Also online tutorial: https://www.youtube.com/watch?v=OnuC3VtEQks&t=407s
    //if(!identity instanceof userIdentity) throw error("Unmatched identity type!")
    //bcrypt.hash(identity.plainPassword, 20).then(async function(err, hash) {
        console.log("Yep!!!");
        //if(err) callBack(err, null);
        //identity.hashPassword = hash;
        //Store the information into the database
        var query = 'INSERT INTO identity (username, email, password, regtime) VALUES (' +
            "\'" + identity.username + "\' "  + ',' +
            "\'" + identity.email + "\' " + ',' +
            "\'" + identity.plainPassword + "\' " + ',' +
            '\'' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '\'' + ')';
        var request = await connection.sqlQuery(query);

        query = 'SELECT id FROM identity WHERE email = ' + '\'' + identity.email + '\'';
        request = await connection.sqlQuery(query);


        var term = [];
        var mid = [];

        term.push('id');
        mid.push(request[0].id);

        if(userInfo.phone !== undefined) {
            term.push('phone');
            mid.push(userInfo.phone);
        }

        if(userInfo.institution !== undefined) {
            term.push('institution');
            mid.push(userInfo.institution);
        }

        if(userInfo.major !== undefined) {
            term.push('major');
            mid.push(userInfo.major);
        }

        if(userInfo.nickname !== undefined) {
            term.push('nickname');
            mid.push(userInfo.nickname);
        }

        var value = '(';
        var column = '(';

        for(var i = 0; i < mid.length; i++){
            value += '\'' + mid[i] + '\'';
            column += term[i];
            if(!(i === (mid.length - 1)))
            {
                value += ', ';
                column += ', ';
            }
        }

        column += ')';

        query = 'INSERT INTO information ' + column +  ' VALUES ' + value + ')';
        request = await connection.sqlQuery(query);
        callBack(request);
    //});
    //callback
}

function regValidate(req, checkUser, callBack)
{
    req.checkBody('email', 'Email cannot be empty!').isEmpty().isEmail();
    req.checkBody('username', 'Username should be between 5 to 15 characters').isLength({min:5, max: 15});
    req.checkBody('password', 'Password should between 8 to 20 characters').isLength({min: 8, max: 20});
    //req.checkBody(checkUser.password, 'Password should between 8 to 20 characters').isEqual(req.body.checkPassword);
    //Other validations

    var result = req.getValidationResult();
    callBack(result);
}

var isUserExist = async function(email, callBack){
    try{
        var exist = false;
        var query = 'SELECT id FROM identity WHERE email = \'' + email + '\'';

        var result = await connection.sqlQuery(query);

        if (result.length == 0) {
            callBack(null, false);
        }

        else {
            callBack(result[0].id, true);
        }
    }
    catch (err){
        callBack(err);
    }

}

var isPasswordMatch = async function(id, pwCandidate, callBack){
    var query = 'SELECT password FROM identity WHERE id = ' + id;
    var result = await connection.sqlQuery(query);
    if(result.length == 0){
        callBack(false, {error: 'User is not exist!'});
    }
    else{
        try{
            var pw = result[0].password.toString();
            if(passwordHash.isHashed(pwCandidate)){
                var result = passwordHash.verify(pw, pwCandidate);
                if(!result) return callBack(false, {error: 'Password is not matched!'});
            } else {
                if(pw != pwCandidate) return callBack(false, {error: 'Password is not matched!'});
            }
            return callBack(true, null);
        }
        catch(err){
            callBack(false, err);
        }


            //});
        //});
    }
}

var loginCheck = function(email, password, callBack) {
    isUserExist(email, (id, exist, err) => {
        if(err) throw err;
        if(!exist) callBack(false, 'User does not exist!');
        else {
            isPasswordMatch(id, password, (match, message) => {
                if(!match) callBack(false, message);
                    else callBack({
                    id: id,
                    email: email,
                    password: password
                }, 'Valid information!');
            });
        }
    })

}

var getUserFromId = async function(id, callBack){
    try{
        var query = 'SELECT * FROM identity WHERE id = ' + id;
        var result = await connection.sqlQuery(query);
        callBack(null, result[0]);
    }
    catch(err) {
        callBack(err, null);
    }

}

var getEmailFromUsername = async function (username, callBack){
    var query = 'SELECT email FROM identity WHERE username = ' + '\'' + username + '\'';
    try{
        var result = await connection.sqlQuery(query);
        callBack(null, result[0]);
    }catch(err){
        callBack(err, null);
    }
}

module.exports= {
    isUserExist : isUserExist,
    userIdentity : userIdentity,
    createUser : createUser,
    regValidate : regValidate,
    loginCheck : loginCheck,
    getUserFromId: getUserFromId,
    userInformation: userInformation,
    getEmailFromUsername: getEmailFromUsername
};