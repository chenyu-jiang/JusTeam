const dbTeam = require('./dbConnectionForTeamSystem');
const Team = require('./Team');

//create input interface: {'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : 'string', 'reminder' : string}
//edit input interface: {'teamID' : integer,'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : 'string', 'reminder' : string}
//add member input interface : {teamID: integer, userID: integer}
//delete member input interface : {teamID: integer, userID: integer}
//edit authority input interface : {teamID: integer, userID : integer, newRight: integer}
//team attach event input interface : {teamID : integer, eventID: integer}


module.exports = {
  creatTeam : function createTeam(jsonIn,callback){
    var newTeamID = undefined;
    var newTeam = new Team(null,jsonIn.introduction, jsonIn.teamTitle, jsonIn.maxMember,jsonIn.category,jsonIn.status,jsonIn.reminder);
    async function insertNow(){
      await dbTeam.establishPool();
      dbTeam.insertNewteam(newTeam,(err,result)=>{
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

  deleteTeam : function deleteTeam(teamID,callback){
    async function deleteNow(){
      await dbTeam.establishPool();
      dbteam.deleteTeam(teamID,(err,result)=>{
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

  editTeam : function editTeam(jsonIn,callback){
    dbTeam.establishPool();
    dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
      if(err){
        callback(err,null);
      }
      else{
        var teamUpdating = new team(jsonIn.teamID,jsonIn.introduction, jsonIn.teamTitle, jsonIn.maxMember, jsonIn.category, jsonIn.status, jsonIn.reminder);
        teamUpdating.launchTime = rows[0].launchTime;
        teamUpdating.eventList = rows[0].eventList;
        teamUpdating.memberList = rows[0].memberList;
        dbteam.updateTeamInfo(teamToBeUpdated,(err,result)=>{
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

  askTeam : function askTeam(teamID,callback){
    dbTeam.establishPool();
    dbTeam.askTeamInfo(teamID,(err,rows,fields)=>{
      if(err) {
        callback(err,null,null);
      }
      else{
        callback(null,rows[0],fields);
      }
    });
  },    //return a team object.

  addMember : function addMember(jsonIn,callback){
    var switchTeam = undefined;
    dbTeam.establishPool();
    async function foo(){
      await new Promise((resolve,reject)=>{
        dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
          if(error) {
            var newErr = new Error('[addMember err when asking Team info] - ' + err);
            callback(newErr,null);
            return;
          }
          else{
            switchTeam = rows[0];
            resolve();
          }
        });
      });

      switchTeam.memberList.num = switchTeam.memberList.IDList.push(jsonIn.userID);
      switchTeam.memberList.right.push(1);

      dbTeam.updateTeamInfo(switchTeam,(err,result)=>{
        if(err){
          callback(err,null);
        }
        else{
          callback(err,result);
        }
      });
    }
    foo();
  },

  deleteMember : function deleteMember(jsonIn, callback){
    var switchTeam = undefined;
    async function foo(){
      await new Promise((resolve,reject)=>{
        dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
          if(error) {
            var newErr = new Error('[addMember err when asking Team info] - ' + err);
            callback(newErr,null);
            return;
          }
          else{
            switchTeam = rows[0];
            resolve();
          }
        });
      });

      if(switchTeam.memberList.num == 0){
        callback(new Error('[deleteMember error because member not found]'),null);
        return;
      }
      else{
        for(var i = 0; i < switchTeam.memberList.num; i++){
          if(switchTeam.memberList.IDList[i] == jsonIn.userID){
            switchTeam.memberList.IDList.splice(i,1);
            switchTeam.memberList.num = switchTeam.memberList.IDList.length;
            switchTeam.memberList.right.splice(i,1);
            break;
          }
          else if(i == switchTeam.memberList.num - 1) {
            callback(new Error('[deleteMember error because member not found]'),null);
            return;
          }
        }
      }

      dbTeam.updateTeamInfo(switchTeam,(err,result)=>{
        if(err) {
          callback(new Error('[Member Delete error when Update to DB] - ' + err),null);
          return;
        }
        else {
          callback(null,result);
          return;
        }
      });
    }
    foo();
  },

  editAuthority : function editAuthority(jsonIn, callback){
    var switchTeam = undefined;
    dbTeam.establishPool();
    async function foo(){
      await new Promise((resolve,reject)=>{
        dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
          if(error) {
            var newErr = new Error('[addMember err when asking Team info] - ' + err);
            callback(newErr,null);
            return;
          }
          else{
            switchTeam = rows[0];
            resolve();
          }
        });
      });

      for(var i = 0; i < switchTeam.memberList.num; i++){
        if(switchTeam.memberList.IDList[i] == jsonIn.userID){
          switchTeam.memberList.right[i] = jsonIn.newRight;
          break;
        }
        else if(i == switchTeam.memberList.num - 1) {
          callback(new Error('[editAuthority error because member not found]'),null);
          return;
        }
      }

      dbTeam.updateTeamInfo(switchTeam,(err,result)=>{
        if(err){
          callback(err,null);
        }
        else{
          callback(err,result);
        }
      });
    }
    foo();
  },

  teamAttachEvent : function teamAttachEvent(jsonIn,callback){
    var switchTeam = undefined;
    dbTeam.establishPool();
    async function foo(){
      await new Promise((resolve,reject)=>{
        dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
          if(error) {
            var newErr = new Error('[addEvent0 err when asking Team info] - ' + err);
            callback(newErr,null);
            return;
          }
          else{
            switchTeam = rows[0];
            resolve();
          }
        });
      });

      switchTeam.eventList.num = switchTeam.eventList.IDList.push(jsonIn.eventID);

      dbTeam.updateTeamInfo(switchTeam,(err,result)=>{
        if(err){
          callback(err,null);
        }
        else{
          callback(err,result);
        }
      });
    }
    foo();
  },

  teamDeleteEvent : function teamDeleteEvent(jsonIn,callback){
    var switchTeam = undefined;
    async function foo(){
      await new Promise((resolve,reject)=>{
        dbTeam.askTeamInfo(jsonIn.teamID,(err,rows,fields)=>{
          if(error) {
            var newErr = new Error('[addMember err when asking Team info] - ' + err);
            callback(newErr,null);
            return;
          }
          else{
            switchTeam = rows[0];
            resolve();
          }
        });
      });

      if(switchTeam.eventList.num == 0){
        callback(new Error('[deleteEvent error because event not found]'),null);
        return;
      }
      else{
        for(var i = 0; i < switchTeam.eventList.num; i++){
          if(switchTeam.eventList.IDList[i] == jsonIn.userID){
            switchTeam.eventList.IDList.splice(i,1);
            switchTeam.eventList.num = switchTeam.eventList.IDList.length;
            break;
          }
          else if(i == switchTeam.eventList.num - 1) {
            callback(new Error('[deleteEvent error because event not found]'),null);
            return;
          }
        }
      }

      dbTeam.updateTeamInfo(switchTeam,(err,result)=>{
        if(err) {
          callback(new Error('[Event Delete error when Update to DB] - ' + err),null);
          return;
        }
        else {
          callback(null,result);
          return;
        }
      });
    }
    foo();
  }
}
