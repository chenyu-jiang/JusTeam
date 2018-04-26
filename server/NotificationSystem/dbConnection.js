/**
* Project           : JusTeam/server
*
* Module name       : dbConnection-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : Database connection module for notifictaion system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180315    Michael      1     Fixed bug in getNewUserNotification function.
* 20180316    Michael      2     Fixed bug in history function.
**/

var dbCommon = new (require("../dbCommon"))("messageSystem");
dbCommon.establishPool();
var checkConnection = dbCommon.checkConnection;
var sqlQuery = dbCommon.sqlQuery;

//Update the last time of checking user request
async function updateUserLastRequest(user) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            var checkSQL = "SELECT * FROM LastUserRequest WHERE user_ID = ?;";
            var argList = [user];
            var results = await sqlQuery(checkSQL, argList);
            if (results.length === 0) {
                //new last request
                var sql = "INSERT INTO LastUserRequest (user_ID, lastRequest) VALUES (?, ?);";
                var argList = [user, dbCommon.getDBTime()];
                await sqlQuery(sql, argList);
            } else {
                //update
                var sql = "UPDATE LastUserRequest SET lastRequest = ? WHERE user_ID = ?;";
                var argList = [dbCommon.getDBTime(), user];
                await sqlQuery(sql, argList);
            }
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

//get new notifications' id for user
async function checkLastUserRequest(user) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            //checking LastUserRequest
            var checkLastUserRequest = "SELECT * FROM LastUserRequest WHERE user_ID = ?;";
            var argList = [user];
            var checkResults = await sqlQuery(checkLastUserRequest, argList);
            if (checkResults.length === 0) {
                //no results exist
                resolve(null);
            } else {
                resolve(checkResults[0].lastRequest);
            }
        } catch (err) {
            reject(err);
        }
    });
}

//exposed methods
//interts UserNotification. Throws rejection error if failed.
exports.insertUserNotification = async function insertUserNotification(user, message) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            //check if timeStamp is valid
            var sql = 'INSERT INTO UserNotification (timeStamp, user_ID, message) VALUES (?, ?, ?);';
            var argList = [dbCommon.getDBTime() , user, message];
            var results = await sqlQuery(sql, argList); //may throw error
            resolve(results.insertId);
        } catch (err) {
            reject(err);
        }
    });
}

//returns the results object. Throws rejection error if failed.
exports.getUserNotification = async function getUserNotification(user, start, end) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            var sql = "SELECT * FROM UserNotification WHERE user_ID = ? ORDER BY timeStamp DESC LIMIT ?, ?;"
            var argList = [user, start, end - start + 1];
            var results = await sqlQuery(sql, argList);
            resolve(results);
        } catch (err) {
            reject(err);
        }
    });
}

//returns the new notification content for the user.
exports.getNewUserNotification = async function getNewUserNotification(user) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            //checking LastUserRequest
            var lastUserRequest = await checkLastUserRequest(user);
            var results = undefined;
            if (lastUserRequest === null) {
                //no results exist, get all notifictaions
                var sql = "SELECT * FROM UserNotification WHERE user_ID = ?;";
                var argList = [user];
                results = await sqlQuery(sql, argList);
            } else {
                //results already exist, get notifications
                var sql = "SELECT * FROM UserNotification WHERE user_ID = ? AND timeStamp > ?;";
                var argList = [user, lastUserRequest];
                results = await sqlQuery(sql, argList);
            }
            //update user's lastRequest
            await updateUserLastRequest(user);
            resolve(results);
        } catch (err) {
            reject(err);
        }
    });
}

//returns numOfMessages
exports.getNumberOfNewUserNotification = async function getNumberOfNewUserNotification(user) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            //checking LastUserRequest
            var lastUserRequest = await checkLastUserRequest(user);
            var results = undefined;
            if (lastUserRequest === null) {
                //no results exist, get all notifictaions number
                var sql = "SELECT COUNT(*) AS numOfMessages FROM UserNotification WHERE user_ID = ?;";
                var argList = [user];
                results = await sqlQuery(sql, argList);
            } else {
                //results already exist, get notifications number
                var sql = "SELECT COUNT(*) AS numOfMessages FROM UserNotification WHERE user_ID = ? AND timeStamp > ?;";
                var argList = [user, lastUserRequest];
                results = await sqlQuery(sql, argList);
            }
            resolve(results[0].numOfMessages);
        } catch (err) {
            reject(err);
        }
    });
}

//deletes UserNotification from database. This will not affect MessageBody. Throws rejection error if failed.
exports.deleteUserNotification = async function deleteUserNotification(messageID) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            var sql = "DELETE FROM UserNotification WHERE notification_ID = ?;";
            var argList = [messageID];
            await sqlQuery(sql, argList);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

//inserts MessageBody. Throws rejection error if failed.
exports.insertMessageBody = async function insertMessageBody(messageType, content) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            //check if messageType is valid
            const messageTypes = {
                "JoinRequest": true,
                "TeamMemberUpdate": true,
                "TeamActivityUpdate": true,
                "TeamPublicMessage": true,
                "NewApplicationResult": true
            }
            if (messageTypes[messageType] === undefined) {
                //invalid messageType
                throw new Error("[DB Error] - Invalid messageType");
            }
            var sql = "INSERT INTO MessageBody (timeStamp, messageType, content) VALUES (?, ?, ?);";
            var argList = [dbCommon.getDBTime(), messageType, content];
            var results = await sqlQuery(sql, argList);
            resolve(results.insertId);
        } catch (err) {
            reject(err);
        }
    });
}

//returns MessageBody. Throws rejection error if failed.
exports.getMessageBody = async function getMessageBody(messageID) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            var sql = "SELECT * FROM MessageBody WHERE message_ID = ?;";
            var argList = [messageID];
            var results = await sqlQuery(sql, argList);
            resolve(results[0]);
        } catch (err) {
            reject(err);
        }
    });
}

//deletes MessageBody. Throws rejection error if failed.
exports.deleteMessageBody = async function deleteMessageBody(messageID) {
    return new Promise(async (resolve, reject) => {
        try {
            await checkConnection();
            var sql = "DELETE FROM MessageBody WHERE message_ID = ?;";
            var argList = [messageID];
            await sqlQuery(sql, argList);
            resolve();
        } catch (err) {
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
