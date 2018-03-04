const Message = module.require('./Message');

class JoinRequest extends Message {
    constructor(timeStamp,teamToBeJoined,applicant,joinInfo) {
        super(timeStamp);
        this.teamToBeJoined = teamToBeJoined;
        this.applicant = applicant;
        this.joinInfo = joinInfo;
    }

    sendSingle(user) {
        //Override
        //Database operations
    }
}

module.exports = JoinRequest;
