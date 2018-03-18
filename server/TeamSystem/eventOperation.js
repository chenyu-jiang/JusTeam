const Event = require('./Event');
const dbEvent = require('./dbConnectionForEvent')

//create input interface: {'startTime' = string(datetime), 'endTime' = string(datetime), 'title' = string, 'location' = string, 'specification' = string}
//edit input interface: {'eventID' = integer,'startTime' = string(datetime), 'endTime' = string(datetime), 'title' = string, 'location' = string, 'specification' = string}
//post attach interface: {'eventID': integer, 'postID': integer}
//post delete interface: {'eventID': integer, 'postID': integer}


module.exports = {
  creatEvent : function createEvent(jsonIn,callback){
    var newEventID = undefined;
    var newEvent = new Event(null,jsonIn.startTime, jsonIn.endTime, jsonIn.title, jsonIn.location, jsonIn.specification);
    async function insertNow(){
      await dbEvent.establishPool();
      dbEvent.insertNewEvent(newEvent,(err,result)=>{
        if(err){
          callback(err,null);
        }
        else{
          callback(null,result.insertID);
        }
      });
    };
    insertNow();
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

  editEvent : function editEvent(jsonIn,callback){
    dbEvent.establishPool();
    dbEvent.askEventInfo(jsonIn.eventID,(err,rows,fields)=>{
      if(err){
        callback(err,null);
      }
      else{
        var eventUpdating = new Event(jsonIn.eventID,jsonIn.startTime, jsonIn.endTime, jsonIn.title, jsonIn.location, jsonIn.specification);
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
      console.log(eventAttaching);
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
