//exposed to router

//exposed to other internal modules
const JoinRequest = require("./JoinRequest");
const TeamMemberUpdate = require("./TeamMemberUpdate");
const TeamActivityUpdate = require("./TeamActivityUpdate");
const NewApplicationResult = require("./NewApplicationResult");
const TeamPublicMessage = require("./TeamPublicMessage");
//const NewSystemMessage = require("./NotificationSystem/NewSystemMessage");
//const dbConnection = require("./NotificationSystem/dbConnection");

module.exports = {
    'JoinRequest' : JoinRequest,
    'TeamMemberUpdate' : TeamMemberUpdate,
    'TeamActivityUpdate' : TeamActivityUpdate,
    'NewApplicationResult' : NewApplicationResult,
    'TeamPublicMessage' : TeamPublicMessage,
    //'NewSystemMessage' : NewSystemMessage,
}
