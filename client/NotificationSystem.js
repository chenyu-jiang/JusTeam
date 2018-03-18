const JoinRequest = require("./NotificationSystem/JoinRequest");
const TeamMemberUpdate = require("./NotificationSystem/TeamMemberUpdate");
const TeamActivityUpdate = require("./NotificationSystem/TeamActivityUpdate");
const NewApplicationResult = require("./NotificationSystem/NewApplicationResult");
const TeamPublicMessage = require("./NotificationSystem/TeamPublicMessage");
const NewSystemMessage = require("./NotificationSystem/NewSystemMessage");
//const dbConnection = require("./NotificationSystem/dbConnection");

module.exports = {
    'JoinRequest' : JoinRequest,
    'TeamMemberUpdate' : TeamMemberUpdate,
    'TeamActivityUpdate' : TeamActivityUpdate,
    'NewApplicationResult' : NewApplicationResult,
    'TeamPublicMessage' : TeamPublicMessage,
    'NewSystemMessage' : NewSystemMessage,
}
