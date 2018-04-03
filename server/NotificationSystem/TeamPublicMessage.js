const TeamUpdate = module.require('./TeamUpdate');
const teamOP = require("../TeamSystem/teamOperation");
const identity = require("../AccountSystem/entity/identity");

class TeamPublicMessage extends TeamUpdate {
    constructor(teamToBeUpdated,sender,message) {
        super(teamToBeUpdated);
        this.content['sender'] = sender;
        this.content['message'] = message;
        this.content["teamID"] = teamToBeUpdated;
        this.messageType = 'TeamPublicMessage';
    }

    async initial(content) {
        return new Promise((resolve,reject)=>{
            teamOP.askTeam(content.teamToBeUpdated,(err,result)=>{
                if(err) reject(err);
                else {
                    content.teamToBeUpdated = result.teamTitle;
                    identity.getUserFromId(content.sender, (err,result)=>{
                        if(err) reject(err);
                        else {
                            content.sender = result.username;
                            resolve(JSON.stringify(content));
                        }
                    });
                }
            });
        });
    }
}

module.exports = TeamPublicMessage;
