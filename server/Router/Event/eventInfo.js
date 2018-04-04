const express = require('express');
const bodyParser = require('body-parser');
const eventOP = require('../../TeamSystem/eventOperation');
var router = express.Router();

router.get('/getTeamEvents',(req,res)=>{
  var eventLists = JSON.parse(req.query.eventList);
  var eventList = eventLists.IDList;
  var events = [];
  var results = {state : 'all'};
  var counter = 0;
  eventList.forEach((id)=>{
        eventOP.askEvent(id, (err,result)=>{
          if(err){
            result.state = 'part';
          }
          else{
            events.push(result);
            counter++;
            if(counter===eventList.length) {
                result.events = events;
                console.log(results);
                res.send(results);
            }
          }
        });
      });
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
