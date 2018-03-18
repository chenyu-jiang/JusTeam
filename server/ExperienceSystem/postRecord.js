async function saveRecord(user, path, isNew, oldPostID) {
    var newPostID = undefined;
    if(isNew === true) {
        newPostID = await dbConnection.insertRecord(path);
    }
    else {
        dbConnection.editRecord(oldPostID, path);
        newPostID = oldPostID;
    }
    return newPostID;
}

async function getRecord(postID) {
    var path = undefined;
    path = await dbConnection.getPath(postID);
    return path;
}

module.exports = {
    "saveRecord": saveRecord,
    "getRecord": getRecord
};
