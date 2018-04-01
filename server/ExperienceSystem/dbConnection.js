var dbCommon = new (require("../dbCommon"))("experienceSystem");

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

async function editRecord(oldPostID, path, teamID, eventID, postTitle, tags) {
    var oldPath = await getRecord(oldPostID);
    oldPath = oldPath.path;
    var sql = "UPDATE records SET path = ?, timeStamp = ?, team_ID = ?, event_ID = ?, postTitle = ?, tags = ? WHERE post_ID = ?;";
    var argList = [path, dbCommon.getDBTime(), teamID, eventID, postTitle, JSON.stringify(tags), oldPostID];
    dbCommon.sqlQuery(sql,argList);
    return oldPath;
}

function deleteRecord(postID) {
    var sql = "DELETE FROM records WHERE post_ID = ?;";
    var argList = [postID];
    dbCommon.sqlQuery(sql,argList);
}

async function deleteRecordByTeam(teamID) {
    var selectSql = "SELECT * FROM records WHERE team_ID = ?;";
    var selectArgList = [teamID];
    var result = await dbCommon.sqlQuery(selectSql,selectArgList);
    var sql = "DELETE FROM records WHERE team_ID = ?;";
    var argList = [teamID];
    dbCommon.sqlQuery(sql,argList);
    return result;
}

async function deleteRecordByEvent(eventID) {
    var selectSql = "SELECT * FROM records WHERE event_ID = ?;";
    var selectArgList = [eventID];
    var result = await dbCommon.sqlQuery(selectSql,selectArgList);
    var sql = "DELETE FROM records WHERE event_ID = ?;";
    var argList = [eventID];
    dbCommon.sqlQuery(sql,argList);
    return result;
}

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

async function setFinal(postID) {
    var querySQL = "SELECT * FROM records WHERE post_ID = ?;";
    var queryArgList = [postID];
    var result = await dbCommon.sqlQuery(querySQL, queryArgList);
    var sql = "UPDATE records SET isFinal = TRUE WHERE post_ID = ?;";
    var argList = [postID];
    dbCommon.sqlQuery(sql, argList);
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
