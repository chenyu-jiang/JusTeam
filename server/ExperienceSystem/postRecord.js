var dbConnection = require("./dbConnection");
var esConnection = require("./esConnection");
var fs = require("fs");

async function saveRecord(content, isNew, oldPostID) {
    var newPostID = undefined;
    try {
        if (isNew) {
            newPostID = await dbConnection.insertRecord(content.path, content.teamID, content.eventID, content.postTitle, content.tags, content.isFinal);
            if (content.isFinal) {
                if (newPostID) {
                    attachESCreate(newPostID, content.path, content.postTitle, content.tags, (err)=>{
                        if(err) console.log(err);
                    });
                }
            }
        } else {
            if(content.isFinal) {
                dbConnection.setFinal(oldPostID);
                attachESCreate(oldPostID, content.path, content.postTitle, content.tags, (err)=>{
                    attachESUpdate(content.path, oldPostID, content.postTitle, content.tags, (err)=>{
                        if(err) console.log(err);
                    });
                });
            }
            var oldPath = await dbConnection.editRecord(oldPostID, content.path, content.teamID, content.eventID, content.postTitle, content.tags);
            fs.unlink(oldPath, (err) => {
                if (err) {
                    console.log("Delete failed.");
                }
            });
            newPostID = oldPostID;
        }
    }
    catch(err) {
        console.log(err);
    }
    return newPostID;
}


function getRecord(postID) {
    return new Promise(async (resolve, reject) => {
        try {
            var record = undefined;
            record = await dbConnection.getRecord(postID);
            var content = undefined;
            fs.readFile(record.path, "utf8", (err, data) => {
                content = data;
                record.content = content;
                resolve(record);
            });
        } catch (err) {
            reject(err);
        }
    });
}

function setFinal(postID) {
    return new Promise(async (resolve, reject) => {
        try {
            dbConnection.setFinal(postID);
            var record = await getRecord(postID);
            esConnection.createPostItem(postID, record.postTitle, record.tags, record.content);
            resolve();
        } catch (err) {
            reject(err);
        }
    })
}

async function deleteRecord(json,callback){
    if(json.deleteByID) {
        var record = await dbConnection.getRecord(json.deleteByID);
        fs.unlink(record.path,(err)=>{
            if(err && callback) callback(err);
        })
        dbConnection.deleteRecord(json.deleteByID);
        esConnection.deletePostItem(json.deleteByID);
    } else {
        if(json.deleteByEvent) {
            var itemList = await dbConnection.deleteRecordByEvent(json.deleteByEvent);
            itemList.forEach((listItem, index)=>{
                esConnection.deletePostItem(listItem.post_ID);
                fs.unlink(listItem.path,(err)=>{
                    if(err && callback) callback(err);
                })
            });
        }
        else {
            if(json.deleteByTeam) {
                var itemList = await dbConnection.deleteRecordByTeam(json.deleteByTeam);
                itemList.forEach((listItem, index)=>{
                    esConnection.deletePostItem(listItem.post_ID);
                    fs.unlink(listItem.path,(err)=>{
                        if(err && callback) callback(err);
                    })
                });
            }
        }
    }
}

function attachESCreate(postID, path, postTitle, tags,callback) {
    var postArticle = undefined;
    fs.readFile(path, "utf8", (err, data) => {
        if (err) console.log(err);
        else {
            postArticle = data;
            if (postTitle && tags && postArticle) {
                    esConnection.createPostItem(postID, postTitle, tags, postArticle,callback);
            } else throw new Error("[Error]-Data incomplete.");
            /////////////////////////////////////
            //TODO:Associate with Account System and TeamSystem
            /////////////////////////////////////
        }
    });
}

function attachESUpdate(path, oldPostID, postTitle, tags, callback) {
    var postArticle = undefined;
    fs.readFile(path, "utf8", (err, data) => {
        if(err) throw new Error(err);
        postArticle = data;
        if (postArticle) {
            esConnection.updatePostItem(oldPostID, postTitle, tags, postArticle,callback);
        }
        else throw new Error("[Error]-Data incomplete.");
    });
}

module.exports = {
    "saveRecord": saveRecord,
    "getRecord": getRecord,
    "setFinal": setFinal,
    "deleteRecord": deleteRecord
};
