/**
* Project           : JusTeam/server
*
* Module name       : Team
*
* Author            : DENG ShiYuan
*
* Date created      : 20180303
*
* Purpose           : Basic class define for Team object
*
* Revision History  :
* NA
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/

class Team {
  constructor (teamID, introduction, teamTitle, maxMember,category,status,reminder,startTime,endTime){
    if(!(new.target)) throw new TypeError("You need to create a new Team with new");

    this.category = category;
    this.status = status;
    this.reminder = reminder;
    this.recentEditTime = null;
    this.teamID = teamID;
    this.introduction = introduction;
    this.teamTitle = teamTitle;
    this.maxMember = maxMember;
    this.launchTime = null;
    this.memberList = {'num':0,'IDList':[],'right':[]};
    this.eventList = {'num':0,'IDList':[]};
    this.startTime = startTime;
    this.endTime = endTime;
  }

  /*createNewTeam : createNewTeam(){

  }*/
}
module.exports = Team;
