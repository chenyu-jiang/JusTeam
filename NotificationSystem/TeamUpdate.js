const Message = module.require("./Message");

class TeamUpdate extends Message {
    constructor(timeStamp,teamToBeUpdated) {
        super(timeStamp);
        this.teamToBeUpdated = teamToBeUpdated;
    }
}

module.exports = TeamUpdate;
