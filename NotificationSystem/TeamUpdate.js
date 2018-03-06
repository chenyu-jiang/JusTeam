const Message = module.require("./Message");

class TeamUpdate extends Message {
    constructor(teamToBeUpdated) {
        super();
        // this.teamToBeUpdated = teamToBeUpdated;
        this.content = {
            "teamToBeUpdated": teamToBeUpdated
        }
    }
}

module.exports = TeamUpdate;
