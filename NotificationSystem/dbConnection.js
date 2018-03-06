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
    if(pool !== undefined) return;
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
    return new Promise((resolve,reject)=>{
        try{
            var id;
            pool.query(sql, (err,results,fields)=>{
                if(err) {
                    throw new Error("[DB Error] - "+err);
                }
                id = results.insertId;
                resolve(id);
            });
        }
        catch(err) {
            reject(err);
        }
    });
}


exports.insertUserNotification = async function insertUserNotification(timeStamp, user,isRead,message) {
    return new Promise(async (resolve,reject)=> {
        try{
            if(pool === undefined) {
                throw new Error("[DB Error] - Connection not established");
            }
            //check if timeStamp is valid
            if(!(Date.parse(timeStamp) > 0)) {
                //invalid timeStamp
                throw new Error('[DB Error] - Invalid timeStamp');
            }
            var sql = 'INSERT INTO UserNotification (timeStamp, user, isRead, message) VALUES (?, ?, ?, ?);';
            var argList = [timeStamp, user, isRead, message];
            sql = mysql.format(sql,argList);
            var id = await sqlQuery(sql); //may throw error
            resolve(id);
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.readUserNotification = async function readUserNotification(messageID) {
    return new Promise(async (resolve,reject)=> {
        try{
            if(pool === undefined) {
                throw new Error("[DB Error] - Connection not established");
            }
            var sql = "UPDATE UserNotification SET isRead = 1 WHERE notification_ID = ?;";
            var argList = [messageID];
            sql = mysql.format(sql, argList);
            //console.log(sql);
            await sqlQuery(sql);
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.deleteUserNotification = async function deleteUserNotification(messageID) {
    return new Promise(async (resolve, reject)=> {
        try{
            if(pool === undefined) {
                throw new Error("[DB Error] - Connection not established");
            }
            var sql = "DELETE FROM UserNotification WHERE notification_ID = ?;";
            var argList = [messageID];
            sql = mysql.format(sql, argList);
            //console.log(sql);
            await sqlQuery(sql);
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.insertMessageBody = async function insertMessageBody(timeStamp, messageType, content) {
    return new Promise(async (resolve,reject) => {
        try{
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
                "NewApplicationResult": true
            }
            if(messageTypes[messageType] === undefined) {
                //invalid messageType
                throw new Error("[DB Error] - Invalid messageType");
            }
            var sql = "INSERT INTO MessageBody (timeStamp, messageType, content) VALUES (?, ?, ?);";
            var argList = [timeStamp,messageType,content];
            sql = mysql.format(sql,argList);
            var id = await sqlQuery(sql);
            resolve(id);
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.deleteMessageBody = async function deleteMessageBody(messageID) {
    return new Promise(async (resolve,reject)=>{
        try {
            if(pool === undefined) {
                throw new Error("[DB Error] - Connection not established");
            }
            var sql = "DELETE FROM MessageBody WHERE message_ID = ?;";
            var argList = [messageID];
            sql = mysql.format(sql, argList);
            await sqlQuery(sql);
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.insertSystemNotification = async function insertSystemNotification(timeStamp, content) {
    return new Promise(async (resolve,reject)=> {
        try {
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
            var id = await sqlQuery(sql).insertId;
            resolve(id);
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.deleteSystemNotification = async function deleteSystemNotification(SystemNotificationID) {
    return new Promise(async (resolve,reject)=> {
        try {
            if(pool === undefined) {
                throw new Error("[DB Error] - Connection not established");
            }
            var sql = "DELETE FROM SystemNotification WHERE systemNotification_ID = ?;";
            var argList = [SystemNotificationID];
            sql = mysql.format(sql, argList);
            await sqlQuery(sql);
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
}
