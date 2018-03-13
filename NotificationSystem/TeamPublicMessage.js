const TeamUpdate = module.require('./TeamUpdate');

class TeamPublicMessage extends TeamUpdate {
    constructor(teamToBeUpdated,sender,message) {
        super(teamToBeUpdated);
        this.content['sender'] = sender;
        this.content['message'] = message;
        this.messageType = 'TeamPublicMessage';
    }
}

module.exports = TeamPublicMessage;
