/**
* Project           : JusTeam/server
*
* Module name       : eventOperation
*
* Author            : DENG ShiYuan
*
* Date created      : 20180305
*
* Purpose           : provide functions related to event operation
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180315    DENG ShiYuan      1     Fixed bug in askEvent function.
**/

const Event = require('./Event');
const dbEvent = require('./dbConnectionForEvent')
const teamOP = require('./teamOperation');

//create input interface: {'startTime' = string, 'endTime' = string, 'title' = string, 'location' = string, 'specification' = string}
//edit input interface: {'eventID' = integer,'startTime' = string(datetime), 'endTime' = string(datetime), 'title' = string, 'location' = string, 'specification' = string}
//post attach interface: {'eventID': integer, 'postID': integer}
//post delete interface: {'eventID': integer, 'postID': integer}


module.exports = {

  //add the event into a team's eventList and insert the event information into the database and return rejection error whenever a error occurs
  createEvent : function createEvent(jsonIn,callback){
    var newEventID = undefined;
    var newEvent = new Event(jsonIn.teamID,null,jsonIn.startTime, jsonIn.endTime, jsonIn.title, jsonIn.location, jsonIn.specification);
    async function insertNow(){
      await dbEvent.establishPool();
      dbEvent.insertNewEvent(newEvent,(err,result,fields)=>{
        if(err){
          callback(err,null);
        }
        else{

          async function f(){
            await new Promise((resolve,reject)=>{
              teamOP.teamAttachEvent({teamID : jsonIn.teamID, eventID : result.insertId},(err,result)=>{
                if(err){
                  callback(err,null);
                  resolve();
                }
                else{
                  resolve();
                }
              });
            });

          }
          f();

          callback(null,result.insertId);
        }
      });
    };
    insertNow();
  },

  //delete all the event which belongs to a team due to the ID and delete the eventID from the team's eventList and return rejection through callback fuction when any error happens
  deleteEventByTeam(teamID,callback){
    dbEvent.establishPool();
    dbEvent.deleteEventByTeam(teamID,(err,result)=>{
      if(err){
        callback(err,null);
      }
      else{
        callback(null,result);
      }
    });
  },

  deleteEvent : function deleteEvent(eventID,callback){
    async function deleteNow(){
      await dbEvent.establishPool();
      dbEvent.deleteEvent(eventID,(err,result)=>{
        if(err){
          callback(err,null);
        }
        else{
          callback(null,result);
        }
      });
    }
    deleteNow();
  },

  //edit the event information and return rejection error if any error happens
  editEvent : function editEvent(jsonIn,callback){
    dbEvent.establishPool();
    dbEvent.askEventInfo(jsonIn.eventID,(err,rows,fields)=>{
      if(err){
        callback(err,null);
      }
      else{
        var eventUpdating = new Event(jsonIn.teamID, jsonIn.eventID,jsonIn.startTime, jsonIn.endTime, jsonIn.title, jsonIn.location, jsonIn.specification);
        eventUpdating.launchTime = rows[0].launchTime;
        eventUpdating.postList = rows[0].postList;
        dbEvent.updateEventInfo(eventUpdating,(err,result)=>{
          if(err){
            callback(err,null);
          }
          else{
            callback(null,result);
          }
        });
      }
    });
  },

  //return event information due to the ID input and return rejection error if any error happens
  askEvent : function askEvent(eventID,callback){
    dbEvent.establishPool();
    dbEvent.askEventInfo(eventID,(err,rows,fields)=>{
      if(err) {
        callback(err,null,null);
      }
      else{
        callback(null,rows[0],fields);
      }
    });
  },    //return a event object.

  //add a postID into an event's postList and return rejection error if any error happens
  postAttachEvent : function postAttachEvent(jsonIn,callback){
    var eventAttaching = undefined;
    async function attachNow(){
      dbEvent.establishPool();
      await new Promise((resolve,reject)=>{
        dbEvent.askEventInfo(jsonIn.eventID,(err,rows,fields)=>{
          if(err){
            callback(new Error('[Post Attach error when askEventInfo] - ' + err),null);
            return;
          }
          else{
            eventAttaching = rows[0];
            resolve();
          }
        });
      });
      //eventAttaching.postList = JSON.parse(eventAttaching.postList);
      eventAttaching.postList.num = eventAttaching.postList.IDList.push(jsonIn.postID);
      dbEvent.updateEventInfo(eventAttaching,(err,result)=>{
        if(err) {
          callback(new Error('[Post Attach error when Update to DB] - ' + err),null);
          return;
        }
        else {
          callback(null,result);
          return;
        }
      });
    }
    try{
      attachNow();
    }
    catch(err){
      callback(err,null);
      return;
    }
  },

  //delete a postID from a event's postList and return rejection error if any error occurs
  postDeleteEvent : function postDeleteEvent(jsonIn,callback){
    var eventDeleting = undefined;
    async function deleteNow(){
      dbEvent.establishPool();
      await new Promise((resolve,reject)=>{
        dbEvent.askEventInfo(jsonIn.eventID,(err,rows,fields)=>{
          if(err){
            callback(new Error('[Post Delete error when askEventInfo] - ' + err),null);
            return;
          }
          else{
            eventDeleting = rows[0];
            resolve();
          }
        });
      });
      /*await*/// eventDeleting.postList = JSON.parse(eventDeleting.postList);
      /*await*/
      if(eventDeleting.postList.num == 0){
        callback(new Error('[Post Delete error because Post not found]'),null);
        return;
      }
      else{
        for(var i = 0; i < eventDeleting.postList.num; i++){
          if(eventDeleting.postList.IDList[i] == jsonIn.postID){
            eventDeleting.postList.IDList.splice(i,1);
            eventDeleting.postList.num = eventDeleting.postList.IDList.length;
            break;
          }
          else if(i == eventDeleting.postList.num - 1) {
            callback(new Error('[Post Delete error because Post not found]'),null);
            return;
          }
        }
      }

      dbEvent.updateEventInfo(eventDeleting,(err,result)=>{
        if(err) {
          callback(new Error('[Post Delete error when Update to DB] - ' + err),null);
          return;
        }
        else {
          callback(null,result);
          return;
        }
      });
    }
    try{deleteNow();}
    catch(err){
      callback(err,null);
      return;
    }
  }
}
