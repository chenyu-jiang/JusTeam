var dbConnection = require("./dbConnection");
var esConnection = require("./esConnection");
var fs = require("fs");

async function saveRecord(content, isNew, oldPostID) {
    var newPostID = undefined;
    if(isNew) {
        var postArticle = undefined;
        newPostID = await dbConnection.insertRecord(content.path);
        fs.readFile(content.path,"utf8",(err,data)=>{
            if(err) console.log(err);
            else {
                postArticle = data;
                if(content.postTitle && content.tags && postArticle) {
                    esConnection.createPostItem(newPostID, content.postTitle, content.tags,postArticle);
                }
                else throw new Error("[Error]-Data incomplete.");
                /////////////////////////////////////
                //TODO:Associate with Account System
                /////////////////////////////////////
            }
        });
    }
    else {
        dbConnection.editRecord(oldPostID, content.path);
        var postArticle = undefined;
        await fs.readFile(content.path,"utf8",(err,data)=>{
            postArticle = data;
        });
        if(postArticle) esConnection.updatePostItem(oldPostID, content.postTitle, content.tags, postArticle);
        else throw new Error("[Error]-Data incomplete.");
        newPostID = oldPostID;
    }
    return newPostID;
}

async function getRecord(postID) {
    var path = undefined;
    path = await dbConnection.getPath(postID);
    fs.readFile(path,"utf8",(err,data)=>{
        return data;
    });
}

module.exports = {
    "saveRecord": saveRecord,
    "getRecord": getRecord
};
