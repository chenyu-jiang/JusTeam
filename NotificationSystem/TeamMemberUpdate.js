const TeamUpdate = module.require('./TeamUpdate');

class TeamMemberUpdate extends TeamUpdate {
    constructor(teamToBeUpdated,newMembers,quittedMembers) {
        super(teamToBeUpdated);
        this.content['newMembers'] = newMembers;
        this.content['quittedMembers'] = quittedMembers;
        this.messageType = 'TeamMemberUpdate';
    }
}

module.exports = TeamMemberUpdate;
