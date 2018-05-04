/**
* Project           : JusTeam/server/AccountSystem
*
* Module name      : information
*
* Author            : WANG Yuxuan
*
* Date created      : 20180317
*
* Purpose           : This module includes entities and procedures for fetching and manipulating additional information for personal accounts.
*                            Information related to this module is not compulsory.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180319    WANG Yuxuan      1     Removed some bugs of delete functions.
* 20180319    WANG Yuxuan      2     Fix sone bugs of add functions.
**/

var dbCommon = require('../../dbCommon');
var connection = new dbCommon('accountSystem');

function generalInfo(location, age, career, mobile) {
    this.location = location;
    this.age = age;
    this.career = career;
    this.mobile = mobile;
};

var addTeam = async function (teamID, userID){
    try{
        var query = 'SELECT team FROM information WHERE id = ' + userID;
        var result = await connection.sqlQuery(query);
        var team = JSON.parse(result[0].team);
        if(team == undefined) team = [];
            team.push(teamID);
        query = 'UPDATE information SET team = ' + '\'[' + team + ']\' WHERE id = ' + userID;
        result = await connection.sqlQuery(query);
    } catch(err){
        throw err;
    }
}

var addPost = async function (postID, userID){
    try {
        var query = 'SELECT post FROM information WHERE id = ' + userID;
        var result = await connection.sqlQuery(query);
        var post = JSON.parse(result[0].post);
        if(post == undefined) post = [];
            post.push(teamID);
        query = 'UPDATE information SET team = ' + '\'[' + post + ']\' WHERE id = ' + userID;
        result = await connection.sqlQuery(query);
    } catch(err){
        throw err;
    }
}

var deleteTeam = async function (teamID, userID){
    try {
        var query = 'SELECT team FROM information WHERE id = ' + userID;
        var result = await connection.sqlQuery(query);
        var team = JSON.parse(result[0].team);
        var deleteID = team.findIndex((element) => {
            return element == teamID;
        });
        team.splice(deleteID, 1);
        query = 'UPDATE information SET team = ' + '\'[' + team + ']\' WHERE id = ' + userID;
        result = await connection.sqlQuery(query);
    } catch(err){
        throw err;
    }
}

var deletePost = async function (postID, userID){
    try {
        var query = 'SELECT post FROM information WHERE id = ' + userID;
        var result = await connection.sqlQuery(query);
        var post = JSON.parse(result[0].team);
        var deleteID = post.findIndex((element) => {
            return element == postID;
        });
        post.splice(deleteID, 1);
        query = 'UPDATE information SET post = ' + '\'[' + post + ']\' WHERE id = ' + userID;
        result = await connection.sqlQuery(query);
    } catch(err){
        throw err;
    }
}

class requestInfo{
    constructor(item, id, callBack){
        if(!item instanceof Array)  callBack(Error("Invalid input!"));
        this.item = item;
        this.id = id;
    }

    getID(){
        return this.id;
    }

    getSearchQuery(tableName, callBack){
        var query = 'SELECT ';
        for(var i = 0; i < this.item.length; i++) {
            query += this.item[i];
            if(i != this.item.length - 1) query += ', ';
        }
        query += ' FROM ' + tableName + ' WHERE id = ' + this.id + ';';
        callBack (query);
    }
}

class editItem{
    constructor(id, item, value){
        this.item = item;
        this.value = value;
        this.id = id;
    }

    getID(){
        return this.id;
    }

    getEditQuery(tableName, callBack){
        if(!tableName instanceof String) throw new Error("Invalid input");
        var query = 'UPDATE ' + tableName + ' SET ';
        for(var i = 0; i < this.item.length; i++){
            query += this.item[i] + ' = ' + '\'' + this.value[i] + '\'';
            if(i != this.item.length - 1) query += ', ';
        }
        query += ' WHERE id = ' + this.id;
        callBack(query);
    }
}

module.exports = {
    editItem: editItem,
    requestInfo: requestInfo,
    addTeam: addTeam,
    addPost: addPost,
    deleteTeam: deleteTeam,
    deletePost: deletePost
};
