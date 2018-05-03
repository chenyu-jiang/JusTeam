/**
* Project           : JusTeam/server
*
* Module name      : esConnection-Experience
*
* Author            : JIANG Chenyu
*
* Date created      : 20180309
*
* Purpose           : ElasticSearch connection module for experience system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180310    Michael      1     Fixed update error.
*
**/

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

//Index name constants
var teamIndexName = "team";
var postIndexName = "post";
var teamTypeName = "team";
var postTypeName = "post";

//Create a new item in elasticsearch. Captures error in callback.
async function createPostItem(postId, postTitle, content, callback) {
    client.create({
        index: postIndexName,
        type: postTypeName,
        id: postId,
        body: {
            "postTitle": postTitle,
            "content": content
        }
    },(err, response)=>{
        if(callback) callback(err);
    });
}

//Update a existing item in elasticsearch. Captures error in callback.
async function updatePostItem(postId, postTitle, content, callback) {
    await client.delete({
        index: postIndexName,
        type: postTypeName,
        id: postId,
    },(err, response)=>{
        if(callback) callback(err);
    });
    createPostItem(postId, postTitle,content);
}

//Delete a existing item in elasticsearch. Captures error in callback.
async function deletePostItem(postID,callback) {
    client.delete({
        index: postIndexName,
        type: postTypeName,
        id: postID
    },(err, response)=>{
        if(callback) callback(err);
    });
}

module.exports = {
    "createPostItem": createPostItem,
    "updatePostItem": updatePostItem,
    "deletePostItem": deletePostItem
}
