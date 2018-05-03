/**
* Project           : JusTeam/server
*
* Module name       : dbConnectionForEvent
*
* Author            : DENG ShiYuan
*
* Date created      : 20180303
*
* Purpose           : Database connection module for event system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180313    DENG ShiYuan      1     Fixed bug in askEventInfo function.
**/

const mysql = module.require("mysql");
const dbHost = '127.0.0.1';                 // localhost for dev
const dbUser = 'root';                      // root for dev
const dbPassword = 'JusTeam3100Project!';   // plain text password? Really?
const dbPort = '3306';                      // port for dev
const dbName = 'teamSystem';
const eventInsertSQL = 'INSERT INTO formal_event (teamID, startTime, endTime, title, location, specification,launchTime,recentEditTime,postList) VALUES(?,?,?,?,?,?,?,?,?)';
const eventUpdateSQL = 'UPDATE formal_event SET startTime=?, endTime=?, title=?, location=?, specification=?,recentEditTime=?,postList=? WHERE eventID = ?';
const eventQuerySQL = 'SELECT * FROM formal_event';
const eventQueryByID = 'SELECT * FROM formal_event WHERE eventID = ?';
const eventDeleteSQL = 'DELETE FROM formal_event WHERE eventID=?';
const eventDeleteByTeamID = 'DELETE FROM formal_event WHERE teamID=?';

var eventSystemPool = undefined;

module.exports = {

//Update the last time of checking user request
getDBTime : function getDBTime(){
    var date = new Date(Date.now());
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+ (date.getMonth()+1) : (date.getMonth()+1)) + '-';
    var D = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + ' ';
    var h = date.getHours() + ':';
    var m = (date.getMinutes() < 10 ? '0'+ date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return (Y+M+D+h+m+s);
  },

//establish database pool for event system
establishPool : function createPool(){
    if(eventSystemPool !== undefined) return;
    try{
       eventSystemPool = mysql.createPool({
         connectionLimit : 100,
         host : dbHost,
         user : dbUser,
         password : dbPassword,
         port : dbPort,
         database : dbName
       },(err)=>{
         if(err){
           throw new Error("[DB Connection Error] -" + err);
         }
       });
      }
      catch(err){
        console.log(err);           //err可以以这种方式输出么
        return null;
      }
      return eventSystemPool;
  },


//delete all the event belongs to the given team and return rejection error if failed
deleteEventByTeam : function deleteEventByTeam(teamID,callback){
  var deleteEvent_Params = [teamID];
  eventSystemPool.query(eventDeleteByTeamID,deleteEvent_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB deleteEventByTeam Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},

//return the event information and return rejection error if failed througth the callback funtion
askEventInfo : function askEventInfo(eventID,callback){
    var eventQueryByID_Params = [eventID];
    eventSystemPool.query(eventQueryByID,eventQueryByID_Params,(err,rows,fields)=>{
      if(err) {
        var newErr = new Error("[DB Query Error] -" + err);
        callback(newErr,null,null);
      }
      else{
        for(let i = 0; i < rows.length; i++){
          rows[i].postList = JSON.parse(rows[i].postList);
        }
        callback(null,rows,fields);
      }
    });
},                    //成品

//create new event into database and return rejection error if failed througth the callback funtion
insertNewEvent : function insertNewEvent(newevent,callback){
  newevent.launchTime = this.getDBTime();
  newevent.recentEditTime = newevent.launchTime;
  var eventInsertSQL_Params = [newevent.teamID, newevent.startTime, newevent.endTime, newevent.title, newevent.location, newevent.specification,newevent.launchTime,newevent.recentEditTime,JSON.stringify(newevent.postList)];
  eventSystemPool.query(eventInsertSQL,eventInsertSQL_Params,(err,result)=>{
    if(err){
      var newErr = new Error("[DB Insert Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},           //成品

// edit a exsiting event's information and return rejection error if failed
updateEventInfo: function updateEventInfo(eventToBeUpdated, callback){
  eventToBeUpdated.recentEditTime = this.getDBTime();
  console.log(eventToBeUpdated);
  var eventUpdate_Params = [eventToBeUpdated.startTime, eventToBeUpdated.endTime, eventToBeUpdated.title, eventToBeUpdated.location, eventToBeUpdated.specification,eventToBeUpdated.recentEditTime,JSON.stringify(eventToBeUpdated.postList),eventToBeUpdated.eventID];
  console.log(eventUpdate_Params);
  eventSystemPool.query(eventUpdateSQL,eventUpdate_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB Update Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},         //成品

//delete a event information due to the ID input and return error through the callback funtion 
deleteEvent: function deleteEvent(eventID,callback){
  var deleteEvent_Params = [eventID];
  eventSystemPool.query(eventDeleteSQL,deleteEvent_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB Update Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
}
}
