const TeamUpdate = module.require('./TeamUpdate');

class TeamMemberUpdate extends TeamUpdate {
    constructor(timeStamp,teamToBeUpdated,newMembers,quittedMembers) {
        super(timeStamp,teamToBeUpdated);
        this.newMembers = newMembers;
        this.quittedMembers = quittedMembers;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = TeamMemberUpdate;
