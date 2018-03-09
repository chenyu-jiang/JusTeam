const Message = module.require("./Message");

class TeamUpdate extends Message {
    constructor(teamToBeUpdated) {
        super();
        this.content = {
            "teamToBeUpdated": teamToBeUpdated
        }
    }
}

module.exports = TeamUpdate;
