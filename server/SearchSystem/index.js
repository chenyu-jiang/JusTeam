/**
* Project           : JusTeam/server
*
* Module name       : NotificationSystem Interface
*
* Author            : JIANG Chenyu
*
* Date created      : 20180312
*
* Purpose           : Implements the search system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

//name constants
var teamIndexName = "team";
var teamTypeName = "team";
var teamQueryFields = [];
var postIndexName = "post";
var postTypeName = "post";
var postQueryFields = ["postTitle^3","content","tags^2"];
var teamQueryFields = ["teamTitle^3", "introduction", "category^2"];

//performs a search operation
function search(searchString, offset, limit, indexName, typeName, queryFields) {
    return new Promise(async (resolve, reject)=>{
        var searchResult = {
            results: []
        };
        //call ES function
        client.search({
            index:indexName,
            type:typeName,
            from: offset,
            size: limit,
            body:{
                query: {
                    multi_match: {
                        query : searchString,
                        fields : queryFields
                    }
                }
            }
        }, (err, response)=> {
            if(err) reject(err);
            else {
                hitList = response["hits"]["hits"];
                //append results
                for(var i=0;i<hitList.length;i++) {
                    var item = {
                        id : hitList[i]['_id'],
                        content : hitList[i]["_source"]
                    }
                    searchResult.results.push(item);
                }
                resolve(searchResult);
            }
        });
    });
}

//Wrapper for post search
function searchPost(searchString, offset, limit) {
    return search(searchString,offset,limit,postIndexName,postTypeName,postQueryFields);
}

//Wrapper for team search
function searchTeam(searchString, offset, limit) {
    return search(searchString,offset,limit,teamIndexName,teamTypeName,teamQueryFields);
}

module.exports = {
    searchPost: searchPost,
    searchTeam: searchTeam
}
