const TeamUpdate = module.require('./TeamUpdate');

class TeamPublicMessage extends TeamUpdate {
    constructor(timeStamp,teamToBeUpdated,message) {
        super(timeStamp,teamToBeUpdated);
        this.message = message;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = TeamPublicMessage;
