/**
* Project           : JusTeam/server
*
* Module name       : ApplicationResult-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message class used for sending application result to other
                      users.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

const Message = module.require('./Message');
const teamOP = require("../TeamSystem/teamOperation");
const identity = require("../AccountSystem/entity/identity");

class NewApplicationResult extends Message {
    constructor(result, teamApplied) {
        super();
        this.content = {
            'result': result,
            'teamApplied': teamApplied,
            "teamID" : teamApplied
        }
        this.messageType = "NewApplicationResult";
        this.initial = this.initial.bind(this);
    }

    async initial(content) {
        return new Promise((resolve,reject)=>{
            //get team name
            teamOP.askTeam(content.teamApplied,(err,result)=>{
                if(err) reject(err);
                else {
                    content.teamApplied = result.teamTitle;
                    resolve(JSON.stringify(content));
                }
            });
        });
    }
}

module.exports = NewApplicationResult;
