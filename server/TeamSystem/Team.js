class Team {
  constructor (teamID, introduction, teamTitle, maxMember,category,status,reminder){
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
  }

  /*createNewTeam : createNewTeam(){

  }*/
}
module.exports = Team;
