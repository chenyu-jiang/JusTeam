const express = require('express');
const bodyParser = require('body-parser');
const eventOP = require('../../TeamSystem/eventOperation');
var router = express.Router();

router.get('/getTeamEvents',(req,res)=>{
  var eventLists = JSON.parse(req.query.eventList);
  var eventList = eventLists.IDList;
  var events = [];
  var result = {state : 'all'};

  function askOnce(var_i){
    return new Promise((resolve,reject)=>{
      eventOP.askEvent(eventList[var_i],(err,result,fields)=>{
        if(err){
          reject(err);
        }
        else{
          events.push(result);
          resolve();
        }
      });
    });
  }

  for(var i = 0 ; i < eventList.length; i++){

    async function f(){
      var a = i;
      try {
        await askOnce(i);
        if(a == eventList.length - 1){
          result.events = events;

          var postList = [];
          for(var j = 0; j < events.length; j++){
            postList.concat(events[j].postList.IDList);
          }

          result.postList = postList;

          res.send(result);
        }
      }
      catch(e){
        if(a == eventList.length - 1){
          result.state = 'part';
          result.events = events;
          res.send(result);
        }
      }
    }
    f();
  }
});

router.get('/viewOneEvent', (req,res)=>{
  var aimEvent = parseInt(req.query.eventID);
  eventOP.askEvent(aimEvent, (err,result, fields)=>{
    if(err){
      var a = {state : 'fail'};
      res.send(a);
    }
    else{
      var a = {state : 'success'};
      a.event = result;
      res.send(a);
    }
  });
});

module.exports = router;
