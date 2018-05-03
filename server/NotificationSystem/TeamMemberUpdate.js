/**
* Project           : JusTeam/server
*
* Module name       : TeamActivityUpdate-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message class for sending team member updates.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

const TeamUpdate = module.require('./TeamUpdate');

class TeamMemberUpdate extends TeamUpdate {
    constructor(teamToBeUpdated,newMembers,quittedMembers) {
        super(teamToBeUpdated);
        this.content['newMembers'] = newMembers;
        this.content['quittedMembers'] = quittedMembers;
        this.messageType = 'TeamMemberUpdate';
    }
}

module.exports = TeamMemberUpdate;
