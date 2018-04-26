/**
* Project           : JusTeam/server
*
* Module name      : dbConnection-Experience
*
* Author            : JIANG Chenyu
*
* Date created      : 20180309
*
* Purpose           : Database connection module for experience system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180323    Michael      1     Added deleteRecordByEvent/Team function.
* 20180325    Michael      2     Fixed bug in deleteRecordByTeam function.
*
**/

var dbCommon = new (require("../dbCommon"))("experienceSystem");

//Insert a new record into the database
async function insertRecord(path, userID ,teamID, eventID, postTitle, tags, isFinal) {
    var postID = undefined;
    var sql = "INSERT INTO records (path, user_ID ,timeStamp, team_ID, event_ID, postTitle, tags ,isFinal) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    var argList = [path, userID, dbCommon.getDBTime(), teamID, eventID, postTitle, JSON.stringify(tags), isFinal];
    var result = undefined;
    result = await dbCommon.sqlQuery(sql, argList);
    if(result === undefined || result.insertId === undefined) {
        throw new Error("[DB Error] - Cannot insert post.");
    }
    else {
        postID = result.insertId;
    }
    return postID;
}

//Update an existing record in database
async function editRecord(oldPostID, path, teamID, eventID, postTitle, tags) {
    //get the original path of the record
    var oldPath = await getRecord(oldPostID);
    oldPath = oldPath.path;
    var sql = "UPDATE records SET path = ?, timeStamp = ?, team_ID = ?, event_ID = ?, postTitle = ?, tags = ? WHERE post_ID = ?;";
    var argList = [path, dbCommon.getDBTime(), teamID, eventID, postTitle, JSON.stringify(tags), oldPostID];
    dbCommon.sqlQuery(sql,argList);
    return oldPath;
}

//Delete a record by ID
function deleteRecord(postID) {
    var sql = "DELETE FROM records WHERE post_ID = ?;";
    var argList = [postID];
    dbCommon.sqlQuery(sql,argList);
}

//Delete a record by TeamID
async function deleteRecordByTeam(teamID) {
    //select the old record
    var selectSql = "SELECT * FROM records WHERE team_ID = ?;";
    var selectArgList = [teamID];
    var result = await dbCommon.sqlQuery(selectSql,selectArgList);
    var sql = "DELETE FROM records WHERE team_ID = ?;";
    var argList = [teamID];
    dbCommon.sqlQuery(sql,argList);
    //returns the old record
    return result;
}

//Delete a record by EventID
async function deleteRecordByEvent(eventID) {
    //select the old record
    var selectSql = "SELECT * FROM records WHERE event_ID = ?;";
    var selectArgList = [eventID];
    var result = await dbCommon.sqlQuery(selectSql,selectArgList);
    var sql = "DELETE FROM records WHERE event_ID = ?;";
    var argList = [eventID];
    dbCommon.sqlQuery(sql,argList);
    //returns the old record
    return result;
}

//Get informations of a record
async function getRecord(postID) {
    var record = undefined;
    var sql = "SELECT * FROM records WHERE post_ID = ?;";
    var argList = [postID];
    var result = await dbCommon.sqlQuery(sql, argList);
    if(result === undefined || result[0].path === undefined) {
        throw new Error("[DB Error] - Cannot find path.");
    }
    else {
        record = result[0];
    }
    return record;
}

//Set a record's status to Final
async function setFinal(postID) {
    var querySQL = "SELECT * FROM records WHERE post_ID = ?;";
    var queryArgList = [postID];
    var result = await dbCommon.sqlQuery(querySQL, queryArgList);
    var sql = "UPDATE records SET isFinal = TRUE WHERE post_ID = ?;";
    var argList = [postID];
    dbCommon.sqlQuery(sql, argList);
    //returns the original status of the record
    return result[0].isFinal;
}

module.exports = {
    "insertRecord": insertRecord,
    "editRecord": editRecord,
    "getRecord": getRecord,
    "deleteRecord": deleteRecord,
    "deleteRecordByTeam": deleteRecordByTeam,
    "deleteRecordByEvent": deleteRecordByEvent,
    "setFinal": setFinal
};
