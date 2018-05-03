/**
* Project           : JusTeam/server
*
* Module name       : JoinRequest-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A JoinRequest class used for sending messages
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

const Message = require('./Message');
const dbConnection = require('./dbConnection');
const teamOP = require("../TeamSystem/teamOperation");
const identity = require("../AccountSystem/entity/identity");

class JoinRequest extends Message {
    constructor(teamToBeJoined, applicant, joinInfo) {
        super();
        this.content = {
            'teamToBeJoined': teamToBeJoined,
            'applicant': applicant,
            'userID': applicant,
            'joinInfo': joinInfo,
            'teamID' : teamToBeJoined
        };
        this.messageType = "JoinRequest";
        this.initial = this.initial.bind(this);
    }

    initial(content) {
        console.log(content);
        return new Promise((resolve,reject)=>{
            //get the team name
            teamOP.askTeam(content.teamToBeJoined,(err,result)=>{
                if(err) reject(err);
                else {
                    content.teamToBeJoined = result.teamTitle;
                    identity.getUserFromId(content.applicant, (err,result)=>{
                        if(err) reject(err);
                        else {
                            content.applicant = result.username;
                            resolve(JSON.stringify(content));
                        }
                    });
                }
            });
        });
    }


}

module.exports = JoinRequest;
