class Event {
  constructor (eventID,startTime, endTime, title, location, specification){
  if(!(new.target)) throw new TypeError("You need to create a event with new");
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
