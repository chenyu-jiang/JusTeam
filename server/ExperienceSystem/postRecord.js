/**
* Project           : JusTeam/server
*
* Module name      : postRecord-Experience
*
* Author            : JIANG Chenyu
*
* Date created      : 201803010
*
* Purpose           : This module handles internal calls of other modules to save,
*                     modify, delete and retrieve record information.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180315    Michael      1     Adjusted saving logic to suit setFinal function.
* 20180316    Michael      2     Fixed bug in saveRecord: error when setFinal.
* 20180426    Michael      3     Removed log statements for debugging.
**/


var dbConnection = require("./dbConnection");
var esConnection = require("./esConnection");
var accountInfo = require("../AccountSystem/entity/information");
var eventOperation = require("../TeamSystem/eventOperation");
var fs = require("fs");
var nodePath = require("path");

async function saveRecord(content, isNew, oldPostID) {
    var newPostID = undefined;
    try {
        if (isNew) {
            //If is new record, insert in both database
            newPostID = await dbConnection.insertRecord(content.path, content.user ,content.teamID, content.eventID, content.postTitle, content.tags, content.isFinal);
            if (content.isFinal) {
                //If the status is final, attach it to ElasticSearch
                if (newPostID) {
                    //newPostID retrieved
                    attachESCreate(newPostID, content.path, content.postTitle, (err)=>{
                        if(err) console.log(err);
                    });
                    //attach this post to the event identified by eventID.
                    eventOperation.postAttachEvent({"eventID": parseInt(content.eventID),"postID": parseInt(newPostID)},(err,result)=>{
                        if(err) console.log('attach err ----'+err);
                    });
                    //attach this post to account system.
                    accountInfo.addPost(parseInt(newPostID),parseInt(content.user));
                }
            }
        } else {
            //If not a new record, check if it is final
            if(content.isFinal) {
                //If it is set Final
                var oldStatus = await dbConnection.setFinal(oldPostID);
                if(oldStatus) {
                    //If old status is Final, update according to current info
                    attachESUpdate(content.path, oldPostID, content.postTitle, (err)=>{
                        if(err) console.log(err);
                    });
                }
                else {
                    //attach it to elasticsearch
                    attachESCreate(oldPostID, content.path, content.postTitle,  (err)=>{
                        if(err) console.log(err);
                    });
                    //attach it to event
                    eventOperation.postAttachEvent({"eventID": parseInt(content.eventID),"postID": parseInt(oldPostID)},(err,result)=>{
                        if(err) console.log(err);
                    });
                    //attach it to account
                    accountInfo.addPost(parseInt(oldPostID),parseInt(content.user));
                }
            }
            //get old path
            var oldPath = await dbConnection.editRecord(oldPostID, content.path, content.teamID, content.eventID, content.postTitle, content.tags);
            //delete the old one from file system
            fs.unlink(nodePath.resolve("./")+oldPath, (err) => {
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

//retrieve a record's content
function getRecord(postID) {
    return new Promise(async (resolve, reject) => {
        try {
            //retrieve item from database
            var record = undefined;
            record = await dbConnection.getRecord(postID);
            var content = undefined;
            //read file content
            fs.readFile(nodePath.resolve("./")+record.path, "utf8", (err, data) => {
                content = data;
                record.content = content;
                resolve(record);
            });
        } catch (err) {
            reject(err);
        }
    });
}

//set a record's status to Final
function setFinal(postID, userID) {
    return new Promise(async (resolve, reject) => {
        try {
            //get old status
            var oldStatus = await dbConnection.setFinal(postID);
            var record = await getRecord(postID);
            if(!oldStatus) {
                //if old status is not final, attach.
                esConnection.createPostItem(postID, record.postTitle,record.content);
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

//delete a record in database, and unlink them from account and event system.
async function deleteRecord(json,callback){
    //check delete type
    if(json.deleteByID) {
        //get old record
        var record = await dbConnection.getRecord(json.deleteByID);
        var eventID = record.event_ID;
        //delete related files
        fs.unlink(nodePath.resolve("./")+record.path,(err)=>{
            if(err && callback) callback(err);
        })
        //delete from account system
        accountInfo.deletePost(record.post_ID,record.user_ID);
        //delete from database
        dbConnection.deleteRecord(json.deleteByID);
        //delete from elasticsearch
        esConnection.deletePostItem(json.deleteByID);
        if(eventID){
            //unattach from event system
            eventOperation.postDeleteEvent({"eventID": parseInt(eventID),"postID": parseInt(json.deleteByID)},(err,result)=>{
                if(err) console.log(err);
            });
        }
    } else {
        if(json.deleteByEvent) {
            //delete by event
            var itemList = await dbConnection.deleteRecordByEvent(json.deleteByEvent);
            itemList.forEach((listItem, index)=>{
                //unattach each items in es, account system and delete in file system.
                esConnection.deletePostItem(listItem.post_ID);
                accountInfo.deletePost(listItem.post_ID,listItem.user_ID);
                fs.unlink(nodePath.resolve("./")+listItem.path,(err)=>{
                    if(err && callback) callback(err);
                })
            });
        }
        else {
            if(json.deleteByTeam) {
                //delete by team
                var itemList = await dbConnection.deleteRecordByTeam(json.deleteByTeam);
                itemList.forEach((listItem, index)=>{
                    //unattach each items in es, account system and delete in file system.
                    esConnection.deletePostItem(listItem.post_ID);
                    accountInfo.deletePost(listItem.post_ID,listItem.user_ID);
                    fs.unlink(nodePath.resolve("./")+listItem.path,(err)=>{
                        if(err && callback) callback(err);
                    })
                });
            }
        }
    }
}

//Attach a post to ElasticSearch, creates a new record.
function attachESCreate(postID, path, postTitle, callback) {
    var postArticle = undefined;
    //reads content
    fs.readFile(nodePath.resolve("./")+path, "utf8", (err, data) => {
        if (err) console.log(err);
        else {
            postArticle = data;
            if (postTitle  && postArticle) {
                    esConnection.createPostItem(postID, postTitle,postArticle,callback);
            } else throw new Error("[Error]-Data incomplete.");
        }
    });
}

////Attach a post to ElasticSearch, updates a existing record.
function attachESUpdate(path, oldPostID, postTitle,  callback) {
    var postArticle = undefined;
    fs.readFile(nodePath.resolve("./")+path, "utf8", (err, data) => {
        if(err) throw new Error(err);
        postArticle = data;
        if (postArticle) {
            esConnection.updatePostItem(oldPostID, postTitle, postArticle,callback);
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
