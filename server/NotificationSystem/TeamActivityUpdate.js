/**
* Project           : JusTeam/server
*
* Module name       : TeamActivityUpdate-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message class for sending team activity updates.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

const TeamUpdate = module.require('./TeamUpdate');

class TeamActivityUpdate extends TeamUpdate {
    constructor(teamToBeUpdated,newActivity,deletedActivity,editedActivity) {
        super(teamToBeUpdated);
        this.content['newActivity'] = newActivity;
        this.content['deletedActivity'] = deletedActivity;
        this.content['editedActivity'] = editedActivity;
        this.messageType = 'TeamActivityUpdate';
        console.log(this);
    }
}

module.exports = TeamActivityUpdate;
