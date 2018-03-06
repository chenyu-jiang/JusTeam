const TeamUpdate = module.require('./TeamUpdate');

class TeamPublicMessage extends TeamUpdate {
    constructor(timeStamp,teamToBeUpdated,sender,message) {
        super(timeStamp,teamToBeUpdated);
        this.sender = sender;
        this.message = message;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = TeamPublicMessage;
