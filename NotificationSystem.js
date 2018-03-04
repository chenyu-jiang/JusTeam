const JoinRequest = module.require("./NotificationSystem/JoinRequest");
const TeamMemberUpdate = module.require("./NotificationSystem/TeamMemberUpdate");
const TeamActivityUpdate = module.require("./NotificationSystem/TeamActivityUpdate");
const NewApplicationResult = module.require("./NotificationSystem/NewApplicationResult");
const TeamPublicMessage = module.require("./NotificationSystem/TeamPublicMessage");
const NewSystemMessage = module.require("./NotificationSystem/NewSystemMessage");

module.exports = {
    'JoinRequest' : JoinRequest,
    'TeamMemberUpdate' : TeamMemberUpdate,
    'TeamActivityUpdate' : TeamActivityUpdate,
    'NewApplicationResult' : NewApplicationResult,
    'TeamPublicMessage' : TeamPublicMessage,
    'NewSystemMessage' : NewSystemMessage,
}
