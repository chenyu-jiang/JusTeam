var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

var indexName = "justeam";
var teamTypeName = "team";
var teamQueryFields = [];
var postTypeName = "post";
var postQueryFields = ["postTitle^3","content","tags^2"];

function search(searchString, offset, limit) {
    return new Promise(async (resolve, reject)=>{
        var searchResult = [];
        client.msearch({
            body:[
                {index:indexName, type:postTypeName},
                {
                    from: offset,
                    size: limit,
                    query: {
                        multi_match: {
                            query : searchString,
                            fields : postQueryFields
                        }
                    }
                }
            ]
        }, (err, response)=> {
            if(err) reject(err);
            else {
                hitList = response["responses"][0]["hits"]["hits"];
                for(var i=0;i<hitList.length;i++) {
                    var item = {
                        id : hitList[i]['_id'],
                        content : hitList[i]["_source"]
                    }
                    searchResult.push(item);
                }
                resolve(searchResult);
            }
        });
    });
}

module.exports = {
    search: search
}
