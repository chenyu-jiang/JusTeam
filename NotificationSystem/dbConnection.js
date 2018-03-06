//const async = require('async');

const mysql = module.require("mysql");
const dbHost = '127.0.0.1';                 // localhost for dev
const dbUser = 'root';                      // root for dev
const dbPassword = 'JusTeam3100Project!';   // plain text password? Really?
const dbPort = '3306';                      // port for dev
const dbName = 'messageSystem';

var pool = undefined;

exports.getDBTime = function getDBTime() {
    var date = new Date(Date.now());
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : (date.getMonth()+1)) + '-';
    var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
    var h = date.getHours() + ':';
    var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return (Y+M+D+h+m+s);
}

exports.establishPool = function establishPool() {
    try{
        pool = mysql.createPool({
            connectionLimit : 100,
            host : dbHost,
            user : dbUser,
            password : dbPassword,
            port : dbPort,
            database : dbName
        }, (err)=>{
            if(err) {
                throw new Error("[DB Error] - " + err);
            }
        });
    }
    catch(err) {
        console.log(err);
        return null;
    }
    return pool;
}

function sqlQuery(sql) {
    var res = {};
    pool.query(sql, (err,results, fields)=>{
        if(err) {
            throw new Error("[DB Error] - "+err);
        }
        res = results;
    });
    return res;
}


exports.insertUserNotification = function insertUserNotification(user,isRead,message) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    var sql = 'INSERT INTO UserNotification (user, isRead, message) VALUES (?, ?, ?);';
    var argList = [user, isRead, message];
    sql = mysql.format(sql,argList);
    //console.log(sql);
    var insertId = sqlQuery(sql).insertId; //may throw error
    return insertId;
}

exports.readUserNotification = function readUserNotification(messageID) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    var sql = "UPDATE UserNotification SET isRead = 1 WHERE notification_ID = ?;";
    var argList = [messageID];
    sql = mysql.format(sql, argList);
    //console.log(sql);
    sqlQuery(sql);
}

exports.deleteUserNotification = function deleteUserNotification(messageID) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    var sql = "DELETE FROM UserNotification WHERE notification_ID = ?;";
    var argList = [messageID];
    sql = mysql.format(sql, argList);
    //console.log(sql);
    sqlQuery(sql);
}

exports.insertMessageBody = function insertMessageBody(timeStamp, messageType, content) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    //check if timeStamp is valid
    if(!(Date.parse(timeStamp) > 0)) {
        //invalid timeStamp
        throw new Error('[DB Error] - Invalid timeStamp');
    }
    //check if messageType is valid
    const messageTypes = {
        "JoinRequest": true,
        "TeamMemberUpdate": true,
        "TeamActivityUpdate": true,
        "TeamPublicMessage": true,
        "newApplicationResult": true
    }
    if(messageTypes[messageType] === undefined) {
        //invalid messageType
        throw new Error("[DB Error] - Invalid messageType");
    }
    var sql = "INSERT INTO MessageBody (timeStamp, messageType, content) VALUES (?, ?, ?);";
    var argList = [timeStamp,messageType,content];
    sql = mysql.format(sql,argList);
    var insertId = sqlQuery(sql).insertId;
    return insertId;
}

exports.deleteMessageBody = function deleteMessageBody(messageID) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    var sql = "DELETE FROM MessageBody WHERE message_ID = ?;";
    var argList = [messageID];
    sql = mysql.format(sql, argList);
    sqlQuery(sql);
}

exports.insertSystemNotification = function insertSystemNotification(timeStamp, content) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    //check if timeStamp is valid
    if(!(Date.parse(timeStamp) > 0)) {
        //invalid timeStamp
        throw new Error('[DB Error] - Invalid timeStamp');
    }
    var sql = "INSERT INTO SystemNotification (timeStamp, content) VALUES (?, ?);";
    var argList = [timeStamp,content];
    sql = mysql.format(sql,argList);
    var insertId = sqlQuery(sql).insertId;
    return insertId;
}

exports.deleteSystemNotification = function deleteSystemNotification(SystemNotificationID) {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
    var sql = "DELETE FROM SystemNotification WHERE systemNotification_ID = ?;";
    var argList = [SystemNotificationID];
    sql = mysql.format(sql, argList);
    //console.log(sql);
    sqlQuery(sql);
}
