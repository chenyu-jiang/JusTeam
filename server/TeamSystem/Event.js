/**
* Project           : JusTeam/server
*
* Module name       : Event
*
* Author            : DENG ShiYuan
*
* Date created      : 20180302
*
* Purpose           : Basic class define for the event system
*
* Revision History  :
* NA
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
**/

class Event {
  constructor (teamID, eventID,startTime, endTime, title, location, specification){
  if(!(new.target)) throw new TypeError("You need to create a event with new");
  this.teamID = teamID;
  this.eventID = eventID;
  this.startTime = startTime;
  this.endTime = endTime;
  this.title = title;
  this.location = location;
  this.specification = specification;
  this.postList = {'num':0,'IDList':[]};
  this.launchTime = null;
  this.recentEditTime = null;
  }
}

module.exports = Event;
//eventID,startTime, endTime, title, location, specification,launchTime,recentEditTime,postList
