var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
});

var recomIndexName = "recommend";
var recomTypeName = "recommend";

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

function updateUser(userID, category) {
    return new Promise((resolve,reject)=>{
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

async function test() {
    // await addEmptyUser(134,calls);
    // await updateUser(134,"Terminator",calls);
    // await updateUser(134,"Titanic",calls);
    // await updateUser(134,"Florida",calls);
    // await updateUser(134,"James",calls);
    // await updateUser(134,"Bob",calls);
    // await addEmptyUser(135,calls);
    // await updateUser(135,"Titanic",calls);
    // await updateUser(135,"James",calls);
    // await updateUser(135,"Bob",calls);
    // await addEmptyUser(136,calls);
    // await updateUser(136,"James",calls);
    // await updateUser(136,"Bob",calls);
    // await updateUser(136,"Alice",calls);
    await aggregation(134,calls);
}

test();

module.exports = {
    "addEmptyUser" : addEmptyUser,
    "updateUser" : updateUser
}
