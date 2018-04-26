/**
* Project           : JusTeam/server
*
* Module name       : TeamUpdate-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message base class for all team-related messages.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

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
