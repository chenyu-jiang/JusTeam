var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log:'trace'
});

var indexName = "team";
var teamTypeName = "team";
var postTypeName = "post";

client.search({
index: indexName,
body: {
    query: {
        match_all: {}
        }
    }
});
