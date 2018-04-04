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
