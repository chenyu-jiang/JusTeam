const express = require('express');
const bodyParser = require('body-parser');
const eventOP = require('../../TeamSystem/eventOperation');
const teamOP = require('../../TeamSystem/teamOperation');
const notiOP = require('../../NotificationSystem/NotificationSystem');
const postOP = require('../../experienceSystem/postRecord');

var router = express.Router();

router.post('/createEvent',bodyParser.urlencoded({extended : true}),(req,res)=>{
  req.body.teamID = parseInt(req.body.teamID);
  var newEvent = req.body;
  var teamID = req.body.teamID;
  eventOP.createEvent(newEvent, (err,insertID)=>{
    if(err){

        console.log(err);
      var a = {state : 'fail'};
      res.send(a);
    }
    else{
      var a = {state : 'success'};
      a.insertID = insertID;
      var jsIn = {eventID : insertID, teamID : teamID}
      teamOP.teamAttachEvent(jsIn,(err,result)=>{
        if(err) {
          var b = {state : 'fail'};
          res.send(b);
        }
        else{
          //TODO: notiOP.TeamPublicMessage(newEvent.teamID, req.user.id, 'An new event has been created by your teammates');


          var notification = new notiOP.TeamPublicMessage(teamID, req.user.id, 'A new Event has been created by your teammates');
          var users = undefined;
          async function f(){
            await new Promise((resolve,reject)=>{
              teamOP.askTeam(teamID,(err,result)=>{
                if(!err){
                  users = result.memberList.IDList;
                  notification.send(users,(err)=>{
                    console.log(err);
                  });
                  resolve()
                }
                resolve();
              });
            });
          }
          f();


          res.send(a);
        }
      });
    }
  });
});

router.get('/deleteEvent', (req,res)=>{
  var deletedEvent = parseInt(req.query.eventID);
  var aimTeam = parseInt(req.query.teamID);
  eventOP.deleteEvent(deletedEvent,(err,result)=>{
    if(err) {
      var a = {state : 'fail'};
      res.send(a);
    }
    else{
      var jsIn = {teamID : aimTeam, eventID : deletedEvent};
      teamOP.teamDeleteEvent(jsIn,(err,result)=>{
        if(err) {
          var a = {state : 'fail'};
          res.send(a);
        }
        else{
          var a = {state : 'success'};

          //TODO: delete all the post attached to this event
          postOP.deleteRecord({deleteByEvent : deletedEvent},(err)=>{
              if(err){
                  console.log(err);    
              }
          });


          var notification = new notiOP.TeamPublicMessage(aimTeam, req.user.id, 'one event has been deleted');
          var users = undefined;
          async function f(){
            await new Promise((resolve,reject)=>{
              teamOP.askTeam(aimTeam,(err,result)=>{
                if(!err){
                  users = result.memberList.IDlist;
                  notification.send(users,(err)=>{
                    console.log(err);
                  });
                  resolve()
                }
                resolve();
              });
            });
          }
          f();

          //TODO: notiOP.TeamPublicMessage(aimTeam, req.user.id, 'An event has been deleted by your teammates');
          res.send(a);
        }
      });
    }
  });
});

router.post('/editEvent',bodyParser.urlencoded({extended : true}),(req,res)=>{
  var userID = req.user.id;
  req.body.teamID = parseInt(req.body.teamID);
  var aimTeam = req.body.teamID;
  req.body.eventID = parseInt(req.body.eventID);
  eventOP.editEvent(req.body,(err,result)=>{
    if(err){
      var a = {state : 'fail'};
      res.send(a);
    }
    else{
      var a = {state : 'success'};
      //TODO: notiOP.TeamPublicMessage(aimTeam, req.user.id, 'An event has been edited by your teammates');


      var notification = new notiOP.TeamPublicMessage(aimTeam, req.user.id, 'one event has been edited');
      var users = undefined;
      async function f(){
        await new Promise((resolve,reject)=>{
          teamOP.askTeam(aimTeam,(err,result)=>{
            if(!err){
              users = result.memberList.IDList;
              notification.send(users,(err)=>{
                console.log(err);
              });
              resolve()
            }
            resolve();
          });
        });
      }
      f();


      res.send(a);
    }
  });
});

module.exports = router;
