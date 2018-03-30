var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

var teamIndexName = "team";
var postIndexName = "post";
var teamTypeName = "team";
var postTypeName = "post";

async function createPostItem(postId, postTitle, tags, content) {
    client.create({
        index: postIndexName,
        type: postTypeName,
        id: postId,
        body: {
            "postTitle": postTitle,
            "tags": tags,
            "content": content
        }
    });
}

async function updatePostItem(postId, postTitle, tags, content) {
    await client.delete({
        index: postIndexName,
        type: postTypeName,
        id: postId,
    });
    createPostItem(postId, postTitle,tags,content);
}

module.exports = {
    "createPostItem": createPostItem,
    "updatePostItem": updatePostItem
}
