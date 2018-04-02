var dbConnection = require("./dbConnection");
var esConnection = require("./esConnection");
var accountInfo = require("../AccountSystem/entity/information");
var eventOperation = require("../TeamSystem/eventOperation");
var fs = require("fs");

async function saveRecord(content, isNew, oldPostID) {
    var newPostID = undefined;
    try {
        if (isNew) {
            newPostID = await dbConnection.insertRecord(content.path, content.user ,content.teamID, content.eventID, content.postTitle, content.tags, content.isFinal);
            if (content.isFinal) {
                if (newPostID) {
                    attachESCreate(newPostID, content.path, content.postTitle, content.tags, (err)=>{
                        if(err) console.log(err);
                    });
                    eventOperation.postAttachEvent({"eventID": parseInt(content.eventID),"postID": parseInt(newPostID)},(err,result)=>{
                        if(err) console.log('attach err ----'+err);
                    });
                    accountInfo.addPost(parseInt(newPostID),parseInt(content.user));
                }
            }
        } else {
            if(content.isFinal) {
                var oldStatus = await dbConnection.setFinal(oldPostID);
                console.log("oldStatus: " + oldStatus);
                if(oldStatus) {
                    console.log(oldStatus);
                    attachESUpdate(content.path, oldPostID, content.postTitle, content.tags, (err)=>{
                        if(err) console.log(err);
                    });
                }
                else {
                    attachESCreate(oldPostID, content.path, content.postTitle, content.tags, (err)=>{
                        if(err) console.log(err);
                    });
                    eventOperation.postAttachEvent({"eventID": parseInt(content.eventID),"postID": parseInt(oldPostID)},(err,result)=>{
                        if(err) console.log(err);
                    });
                    accountInfo.addPost(parseInt(oldPostID),parseInt(content.user));
                }
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

function setFinal(postID, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            var oldStatus = await dbConnection.setFinal(postID);
            var record = await getRecord(postID);
            if(!oldStatus) {
                esConnection.createPostItem(postID, record.postTitle, record.tags, record.content);
                eventOperation.postAttachEvent({"eventID": parseInt(record.event_ID),"postID": parseInt(record.post_ID)},(err,result)=>{
                    if(err) console.log(err);
                });
                accountInfo.addPost(parseInt(record.post_ID),parseInt(userID));
            }
            resolve();
        } catch (err) {
            reject(err);
        }
    })
}

async function deleteRecord(json,callback){
    if(json.deleteByID) {
        var record = await dbConnection.getRecord(json.deleteByID);
        var eventID = record.event_ID;
        fs.unlink(record.path,(err)=>{
            if(err && callback) callback(err);
        })
        accountInfo.deletePost(parseInt(record.post_ID),parseInt(content.user));
        dbConnection.deleteRecord(json.deleteByID);
        esConnection.deletePostItem(json.deleteByID);
        if(eventID){
            eventOperation.postDeleteEvent({"eventID": parseInt(eventID),"postID": parseInt(json.deleteByID)},(err,result)=>{
                if(err) console.log(err);
            });
        }
        accountInfo.deletePost(record.post_ID,record.user_ID);
    } else {
        if(json.deleteByEvent) {
            var itemList = await dbConnection.deleteRecordByEvent(json.deleteByEvent);
            itemList.forEach((listItem, index)=>{
                esConnection.deletePostItem(listItem.post_ID);
                accountInfo.deletePost(listItem.post_ID,listItem.user_ID);
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
                    accountInfo.deletePost(listItem.post_ID,listItem.user_ID);
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
