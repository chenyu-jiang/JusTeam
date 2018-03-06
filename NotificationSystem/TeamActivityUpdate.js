const TeamUpdate = module.require('./TeamUpdate');

class TeamActivityUpdate extends TeamUpdate {
    constructor(teamToBeUpdated,newActivity,deletedActivity,editedActivity) {
        super(teamToBeUpdated);
        // this.newActivity = newActivity;
        // this.deletedActivity = deletedActivity;
        // this.editedActivity = editedActivity;
        this.content['newActivity'] = newActivity;
        this.content['deletedActivity'] = deletedActivity;
        this.content['editedActivity'] = editedActivity;
        this.messageType = 'TeamActivityUpdate';
        console.log(this);
    }
}

module.exports = TeamActivityUpdate;
