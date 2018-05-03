/**
* Project           : JusTeam/server
*
* Module name       : dbConnectionForTeamSystem
*
* Author            : DENG ShiYuan
*
* Date created      : 20180304
*
* Purpose           : Database connection module for team system.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180313    DENG ShiYuan      1     Fixed bug in askTeamInfo function.
**/

const mysql = module.require("mysql");
const dbHost = '127.0.0.1';                 // localhost for dev
const dbUser = 'root';                      // root for dev
const dbPassword = 'JusTeam3100Project!';                // plain text password? Really?
const dbPort = '3306';                      // port for dev
const dbName = 'teamSystem';
const teamInsertSQL = 'INSERT INTO formal_team (`introduction`, `teamTitle`, `maxMember`, `launchTime`, `memberList`, `eventList`, `recentEditTime`,`category`,`reminder`,`status`,`startTime`,`endTime`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
const teamUpdateSQL = 'UPDATE formal_team SET `introduction`=?, `teamTitle`=?, `maxMember`=?, `memberList`=?, `eventList`=?,`recentEditTime`=? ,`category` = ?, `reminder` = ?, `status` = ? WHERE `teamID` = ?';
const teamQuerySQL = 'SELECT * FROM formal_team';
const teamQueryByID = 'SELECT * FROM formal_team WHERE teamID = ?';
const teamDeleteSQL = 'DELETE FROM formal_team WHERE teamID = ?';

var teamSystemPool = undefined;

module.exports = {

//establish database pool for event system
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

//establish database pool for team system
  establishPool : function createPool(){
    if(teamSystemPool !== undefined) return;
    try{
       teamSystemPool = mysql.createPool({
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
      return teamSystemPool;
  },

//get team information due to the ID input and return rejection error throgh the callback function if failed
askTeamInfo : function sqlQuery(teamID,callback){
  this.establishPool();
  if(teamID == null){
    teamSystemPool.query(teamQuerySQL,(err,rows,fields)=>{
      if(err) {
        var newErr = new Error("[DB Query Error] -" + err);
        callback(newErr,null,null);
      }
      else{
        for(let i = 0; i < rows.length; i++){
          rows[i].memberList = JSON.parse(rows[i].memberList);
          rows[i].eventList = JSON.parse(rows[i].eventList);
        }
        callback(null,rows,fields);
      }
    });
  }
  else{
    var teamQueryByID_Params = [teamID];
    teamSystemPool.query(teamQueryByID,teamQueryByID_Params,(err,rows,fields)=>{
      if(err) {
        var newErr = new Error("[DB Query Error] -" + err);
        callback(newErr,null,null);
      }
      else{
      for(let i = 0; i < rows.length; i++){
          rows[i].memberList = JSON.parse(rows[i].memberList);
          rows[i].eventList = JSON.parse(rows[i].eventList);
        }
        callback(null,rows,fields);
      }
    });
  }
},

//insert a new team in the database and return rejection error through the callback funtion if failed
insertNewTeam : function insertNewTeam(newTeam,callback){
  newTeam.launchTime = this.getDBTime();
  newTeam.recentEditTime = newTeam.launchTime;
  var teamInsertSQL_Params = [newTeam.introduction, newTeam.teamTitle, newTeam.maxMember, newTeam.launchTime, JSON.stringify(newTeam.memberList), JSON.stringify(newTeam.eventList), newTeam.recentEditTime,newTeam.category,newTeam.reminder,newTeam.status,newTeam.startTime,newTeam.endTime];
  teamSystemPool.query(teamInsertSQL,teamInsertSQL_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB Insert Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},           //成品

//edit a exsting team and return rejection error through the callback funtion if failed
updateTeamInfo: function updateTeamInfo(teamToBeUpdated, callback){
  teamToBeUpdated.recentEditTime = this.getDBTime();
  var teamUpdate_Params = [teamToBeUpdated.introduction,teamToBeUpdated.teamTitle,teamToBeUpdated.maxMember,JSON.stringify(teamToBeUpdated.memberList),JSON.stringify(teamToBeUpdated.eventList),teamToBeUpdated.recentEditTime,teamToBeUpdated.category,teamToBeUpdated.reminder,teamToBeUpdated.status,teamToBeUpdated.teamID];
  teamSystemPool.query(teamUpdateSQL,teamUpdate_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB Update Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},

//delete a team information due to ID and return rejection error through the callback funtion if failed
deleteTeam: function deleteTeam(teamID,callback){
  var deleteTeam_Params = [teamID];
  teamSystemPool.query(teamDeleteSQL,deleteTeam_Params,(err,result) =>{
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
