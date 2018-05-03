/**
* Project           : JusTeam/server
*
* Module name       : NotificationSystem Interface
*
* Author            : JIANG Chenyu, WANG Yuxuan
*
* Date created      : 20180324
*
* Purpose           : Recommendation system based on ElasticSearch.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

var recomIndexName = "recommend";
var recomTypeName = "recommend";

//Creates an empty user in the system
function addEmptyUser(userID, callback) {
    return new Promise((resolve, reject)=>{
        client.create({
            index: recomIndexName,
            type: recomTypeName,
            id: userID,
            body: {
                "tags": []
            }
        },(err, response)=>{
            if(err) reject(err);
            else {
                resolve(true);
            }
        });
    });
}

//Update a user's tag info
function updateUser(userID, category) {
    return new Promise((resolve,reject)=>{
        //get old info
        client.get({
          index: recomIndexName,
          type: recomTypeName,
          id: userID
        }, function (error, response) {
          if(error) reject(err);
          else {
              var oldtags = response._source.tags;
              category = category.toLowerCase();
              if(!response._source.tags.includes(category))
              {
                  //add new tags by first deleting, and then add a new one
                  oldtags.push(category);
                  client.delete({
                      index: recomIndexName,
                      type: recomTypeName,
                      id: userID
                  },(err, response)=>{
                      if(err) reject(err);
                      else {
                          client.create({
                              index: recomIndexName,
                              type: recomTypeName,
                              id: userID,
                              body: {
                                  "tags": oldtags
                              }
                          },(err, response)=>{
                              if(err) reject(err);
                              else resolve(true);
                          });
                      }
                  });
              }
          }
        });
    });
}

//Calculates the recommendation for a user.
function aggregation(userID,callback) {
    //get all the tags of user
    client.get({
      index: recomIndexName,
      type: recomTypeName,
      id: userID
  }, async (error, response)=>{
      if(error) callback(err, null);
      else {
          var tags = response._source.tags;
          var result = {};
          var counter = 0;
          await tags.forEach(async (listItem,index)=>{
              //for each tag, we use aggregation function to recommend content
              await client.search({
                  index:recomIndexName,
                  type:recomTypeName,
                  body:{
                      "query": {
                          "match": {
                              "tags": listItem
                          }
                      },
                      "aggregations": {
                          "recommended": {
                              "significant_terms": {
                                  "field": "tags",
                                  "min_doc_count": 1
                              }
                          }
                      }
                  }
              },(err, aggRes)=>{
                  if(err) callback(err, null);
                  else {
                      //Calculates score for each tag
                      aggRes.aggregations.recommended.buckets.forEach((item)=>{
                          if(result[item.key] == undefined) {
                              result[item.key] = {};
                              result[item.key].score = item.score;
                          }
                          else {
                              result[item.key].score += item.score;
                          }

                      });
                      counter++;
                      if(counter === tags.length) {
                          var scoreArray = [];
                          for(var tgs in result){
                              scoreArray.push({tagName: tgs, score: result[tgs].score});
                          }
                          scoreArray.sort((a, b)=>{
                                return - a.score + b. score;
                          });
                          callback(null, scoreArray);
                          console.log(scoreArray);
                          //callback(null, result);
                      }

                  }
              });
          });
      }
  });
}

function calls(err,response) {
    if(err) console.log(err);
}

// async function test() {
//     // await addEmptyUser(134,calls);
//     // await updateUser(134,"Terminator",calls);
//     // await updateUser(134,"Titanic",calls);
//     // await updateUser(134,"Florida",calls);
//     // await updateUser(134,"James",calls);
//     // await updateUser(134,"Bob",calls);
//     // await addEmptyUser(135,calls);
//     // await updateUser(135,"Titanic",calls);
//     // await updateUser(135,"James",calls);
//     // await updateUser(135,"Bob",calls);
//     // await addEmptyUser(136,calls);
//     // await updateUser(136,"James",calls);
//     // await updateUser(136,"Bob",calls);
//     // await updateUser(136,"Alice",calls);
//     await aggregation(134,calls);
// }
//
// test();

module.exports = {
    "addEmptyUser" : addEmptyUser,
    "updateUser" : updateUser
}
