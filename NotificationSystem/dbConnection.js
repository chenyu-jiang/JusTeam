const mysql = module.require("mysql");
const dbHost = '127.0.0.1';                 // localhost for dev
const dbUser = 'root';                      // root for dev
const dbPassword = 'JusTeam3100Project!';   // plain text password? Really?
const dbPort = '3306';                      // port for dev
const dbName = 'messageSystem';

var pool = undefined;

//private methods

//wrapper method of SQL query, returns results.
function sqlQuery(sql) {
    return new Promise((resolve,reject)=>{
        try{
            var id;
            pool.query(sql, (err,results,fields)=>{
                if(err) {
                    throw new Error("[DB Error] - "+err);
                }
                resolve(results);
            });
        }
        catch(err) {
            reject(err);
        }
    });
}

//checks if connection pool is established
function checkConnection() {
    if(pool === undefined) {
        throw new Error("[DB Error] - Connection not established");
    }
}

async function updateUserLastRequest(user,timeStamp) {
    return new Promise(async (resolve, reject)=> {
        try {
            checkConnection();
            var checkSQL = "SELECT * FROM LastUserRequest WHERE user_ID = ?;";
            var argList = [user];
            checkSQL = mysql.format(checkSQL,argList);
            var results = await sqlQuery(checkSQL);
            if(results.length === 0) {
                //new last request
                var sql = "INSERT INTO LastUserRequest (user_ID, lastRequest) VALUES (?, ?);";
                var argList = [user, timeStamp];
                sql = mysql.format(sql,argList);
                await sqlQuery(sql);
            }
            else {
                //update
                var sql = "UPDATE LastUserRequest SET lastRequest = ? WHERE user_ID = ?;";
                var argList = [timeStamp, user];
                sql = mysql.format(sql,argList);
                await sqlQuery(sql);
            }
            resolve();
        }
        catch(err) {
            reject(err);
        }
    });
}

async function checkLastUserRequest(user) {
    return new Promise(async (resolve, reject)=>{
        try {
            checkConnection();
            //checking LastUserRequest
            var checkLastUserRequest = "SELECT * FROM LastUserRequest WHERE user_ID = ?;";
            var argList = [user];
            checkLastUserRequest = mysql.format(checkLastUserRequest,argList);
            var checkResults = await sqlQuery(checkLastUserRequest);
            if(checkResults.length === 0) {
                //no results exist
                resolve(null);
            }
            else {
                resolve(checkResults[0].lastRequest);
            }
        }
        catch(err) {
            reject(err);
        }
    });
}

//exposed methods

//returns the current server time in [YYYY-MM-DD hh:mm:ss] format.
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

//establishes connection pool
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

//interts UserNotification. Throws rejection error if failed.
exports.insertUserNotification = async function insertUserNotification(timeStamp, user, message) {
    return new Promise(async (resolve,reject)=> {
        try{
            checkConnection();
            //check if timeStamp is valid
            if(!(Date.parse(timeStamp) > 0)) {
                //invalid timeStamp
                throw new Error('[DB Error] - Invalid timeStamp');
            }
            var sql = 'INSERT INTO UserNotification (timeStamp, user_ID, message) VALUES (?, ?, ?);';
            var argList = [timeStamp, user, message];
            sql = mysql.format(sql,argList);
            var results = await sqlQuery(sql); //may throw error
            resolve(results.insertId);
        }
        catch(err) {
            reject(err);
        }
    });
}

//returns the results object. Throws rejection error if failed.
exports.getUserNotification = async function getUserNotification(user, start, end) {
    return new Promise(async (resolve, reject) => {
        try {
            checkConnection();
            var sql = "SELECT * FROM UserNotification WHERE user_ID = ? ORDER BY timeStamp DESC LIMIT ?, ?;"
            var argList = [user,start,end-start+1];
            sql = mysql.format(sql,argList);
            var results = await sqlQuery(sql);
            resolve(results);
        }
        catch(err) {
            reject(err);
        }
    });
}

exports.getNewUserNotification = async function getNewUserNotification(user) {
    return new Promise(async (resolve, reject)=>{
        try {
            checkConnection();
            //checking LastUserRequest
            var lastUserRequest = await checkLastUserRequest(user);
            var results = undefined;
            if(lastUserRequest === null) {
                //no results exist, get all notifictaions
                var sql = "SELECT * FROM UserNotification WHERE user_ID = ?;";
                var argList = [user];
                sql = mysql.format(sql,argList);
                results = await sqlQuery(sql);
            }
            else {
                //results already exist, get notifications
                var sql = "SELECT * FROM UserNotification WHERE user_ID = ? AND timeStamp > ?;";
                var argList = [user, lastUserRequest];
                sql = mysql.format(sql,argList);
                results = await sqlQuery(sql);
            }
            //update user's lastRequest
            await updateUserLastRequest(user,exports.getDBTime());
            resolve(results);
        }
        catch(err) {
            reject(err);
        }
    });
}

//returns numOfMessages
exports.getNumberOfNewUserNotification = async function getNumberOfNewUserNotification(user) {
    return new Promise(async (resolve, reject)=>{
        try {
            checkConnection();
            //checking LastUserRequest
            var lastUserRequest = await checkLastUserRequest(user);
            var results = undefined;
            if(lastUserRequest === null) {
                //no results exist, get all notifictaions number
                var sql = "SELECT COUNT(*) AS numOfMessages FROM UserNotification WHERE user_ID = ?;";
                var argList = [user];
                sql = mysql.format(sql,argList);
                results = await sqlQuery(sql);
            }
            else {
                //results already exist, get notifications number
                var sql = "SELECT COUNT(*) AS numOfMessages FROM UserNotification WHERE user_ID = ? AND timeStamp > ?;";
                var argList = [user, lastUserRequest];
                sql = mysql.format(sql,argList);
                results = await sqlQuery(sql);
            }
            resolve(results[0].numOfMessages);
        }
        catch(err) {
            reject(err);
        }
    });
}

//deletes UserNotification from database. This will not affect MessageBody. Throws rejection error if failed.
exports.deleteUserNotification = async function deleteUserNotification(messageID) {
    return new Promise(async (resolve, reject)=> {
        try{
            checkConnection();
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

//inserts MessageBody. Throws rejection error if failed.
exports.insertMessageBody = async function insertMessageBody(timeStamp, messageType, content) {
    return new Promise(async (resolve,reject) => {
        try{
            checkConnection();
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
            var results = await sqlQuery(sql);
            resolve(results.insertId);
        }
        catch(err) {
            reject(err);
        }
    });
}

//returns MessageBody. Throws rejection error if failed.
exports.getMessageBody = async function getMessageBody(messageID) {
    return new Promise(async (resolve,reject)=>{
        try {
            checkConnection();
            var sql = "SELECT * FROM MessageBody WHERE message_ID = ?;";
            var argList = [messageID];
            sql = mysql.format(sql, argList);
            var results = await sqlQuery(sql);
            resolve(results[0]);
        }
        catch(err) {
            reject(err);
        }
    });
}

//deletes MessageBody. Throws rejection error if failed.
exports.deleteMessageBody = async function deleteMessageBody(messageID) {
    return new Promise(async (resolve,reject)=>{
        try {
            checkConnection();
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

// //inserts systemNotification. Throws rejection error if failed.
// exports.insertSystemNotification = async function insertSystemNotification(timeStamp, content) {
//     return new Promise(async (resolve,reject)=> {
//         try {
//             checkConnection();
//             //check if timeStamp is valid
//             if(!(Date.parse(timeStamp) > 0)) {
//                 //invalid timeStamp
//                 throw new Error('[DB Error] - Invalid timeStamp');
//             }
//             var sql = "INSERT INTO SystemNotification (timeStamp, content) VALUES (?, ?);";
//             var argList = [timeStamp,content];
//             sql = mysql.format(sql,argList);
//             var results = await sqlQuery(sql);
//             resolve(results.insertId);
//         }
//         catch(err) {
//             reject(err);
//         }
//     });
// }
//
// //returns systemNotification. Throws rejection error if failed.
// exports.getSystemNotification = async function getSystemNotification(SystemNotificationID) {
//     return new Promise(async (resolve,reject)=> {
//         try {
//             checkConnection();
//             var sql = "SELECT * FROM SystemNotification WHERE systemNotification_ID = ?;";
//             var argList = [SystemNotificationID];
//             sql = mysql.format(sql, argList);
//             var results = await sqlQuery(sql);
//             resolve(results);
//         }
//         catch(err) {
//             reject(err);
//         }
//     });
// }
//
// //This function is not exposed to front-end.
// exports.deleteSystemNotification = async function deleteSystemNotification(SystemNotificationID) {
//     return new Promise(async (resolve,reject)=> {
//         try {
//             checkConnection();
//             var sql = "DELETE FROM SystemNotification WHERE systemNotification_ID = ?;";
//             var argList = [SystemNotificationID];
//             sql = mysql.format(sql, argList);
//             await sqlQuery(sql);
//             resolve();
//         }
//         catch(err) {
//             reject(err);
//         }
//     });
// }
