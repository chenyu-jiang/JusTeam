const mysql = module.require("mysql");
const dbHost = '127.0.0.1';                 // localhost for dev
const dbUser = 'root';                      // root for dev
const dbPassword = '123456';                // plain text password? Really?
const dbPort = '3306';                      // port for dev
const dbName = 'teamsystem';
const teamInsertSQL = 'INSERT INTO test_team (`teamID`, `introduction`, `teamTitle`, `maxMember`, `launchTime`, `memberList`, `eventList`, `recentEditTime`,`category`,`reminder`,`status`) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
const teamUpdateSQL = 'UPDATE test_team SET `introduction`=?, `teamTitle`=?, `maxMember`=?, `memberList`=?, `eventList`=?,`recentEditTime`=? ,`category` = ?, `reminder` = ? `status` = ? WHERE `teamID` = ?';
const teamQuerySQL = 'SELECT * FROM test_team';
const teamQueryByID = 'SELECT * FROM test_team WHERE teamID = ?';
const teamDeleteSQL = 'DELETE FROM test_team WHERE teamID=?';

var teamSystemPool = undefined;

module.exports = {
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

askTeamInfo : function sqlQuery(teamID,callback){
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
},                    //成品       //成品
insertNewTeam : function insertNewTeam(newTeam,callback){
  newTeam.launchTime = this.getDBTime();
  newTeam.recentEditTime = newTeam.launchTime;
  var teamInsertSQL_Params = [newTeam.teamID, newTeam.introduction, newTeam.teamTitle, newTeam.maxMember, newTeam.launchTime, JSON.stringify(newTeam.memberList), JSON.stringify(newTeam.eventList), newTeam.recentEditTime,newTeam.category,newTeam.reminder,newTeam.status];
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

updateTeamInfo: function updateTeamInfo(teamToBeUpdated, callback){
  teamToBeUpdated.recentEditTime = this.getDBTime();
  var teamUpdate_Params = [teamToBeUpdated.introduction,teamToBeUpdated.teamTitle,teamToBeUpdated.maxMember,JSON.stringify(teamToBeUpdated.memberList),JSON.stringify(teamToBeUpdated.eventList),newTeam.recentEditTime,newTeam.category,newTeam.reminder,newTeam.status,newTeam.teamID];
  teamSystemPool.query(teamUpdateSQL,teamUpdate_Params,(err,result) =>{
    if(err){
      var newErr = new Error("[DB Update Error] -" + err);
      callback(newErr,null);
    }
    else{
      callback(null,result);
    }
  });
},         //成品

deleteTeam: function deleteTeam(teamToBeDelete,callback){
  var deleteTeam_Params = [teamToBeDelete.teamID];
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
