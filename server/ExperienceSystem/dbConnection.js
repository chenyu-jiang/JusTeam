var dbCommon = new (require("../dbCommon"))("experienceSystem");

async function insertRecord(path) {
    var postID = undefined;
    var sql = "INSERT INTO records (path, timeStamp) VALUES (?, ?);";
    var argList = [path, dbCommon.getDBTime()];
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

function editRecord(oldPostID, path) {
    var sql = "UPDATE records SET path = ?, timeStamp = ? WHERE id = ?;";
    var argList = [path, dbCommon.getDBTime(), oldPostID];
    dbCommon.sqlQuery(sql,argList);
}

async function getPath(postID) {
    var path = undefined;
    var sql = "SELECT path FROM records WHERE id = ?;";
    var argList = [postID];
    var result = await dbCommon.sqlQuery(sql, argList);
    if(result === undefined || result[0].path === undefined) {
        throw new Error("[DB Error] - Cannot find path.");
    }
    else {
        path = result[0].path;
    }
    return path;
}

module.exports = {
    "insertRecord": insertRecord,
    "editRecord": editRecord,
    "getPath": getPath
};
