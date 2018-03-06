const Message = require('./Message');
const dbConnection = require('./dbConnection');

class JoinRequest extends Message {
    constructor(teamToBeJoined,applicant,joinInfo) {
        super();
        // this.teamToBeJoined = teamToBeJoined;
        // this.applicant = applicant;
        // this.joinInfo = joinInfo;
        this.content = {
            'teamToBeJoined': teamToBeJoined,
            'applicant': applicant,
            'joinInfo': joinInfo
        };
        this.messageType = "JoinRequest";
    }
}

module.exports = JoinRequest;
