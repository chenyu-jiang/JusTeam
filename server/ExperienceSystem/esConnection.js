var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

var teamIndexName = "team";
var postIndexName = "post";
var teamTypeName = "team";
var postTypeName = "post";

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
