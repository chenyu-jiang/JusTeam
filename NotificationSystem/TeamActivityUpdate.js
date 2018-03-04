const TeamUpdate = module.require('./TeamUpdate');

class TeamActivityUpdate extends TeamUpdate {
    constructor(timeStamp,teamToBeUpdated,newActivity,deletedActivity,editedActivity) {
        super(timeStamp,teamToBeUpdated);
        this.newActivity = newActivity;
        this.deletedActivity = deletedActivity;
        this.editedActivity = editedActivity;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = TeamActivityUpdate;
