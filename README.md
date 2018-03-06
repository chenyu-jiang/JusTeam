# JusTeam
Development of future software engineers.

### Internal Usage

#### Notification system

Notification Types:

```javascript
// (TeamID, UserID, String)
function JoinRequest(teamToBeJoined, applicant, joinInfo);
// (boolean, TeamID)
function NewAppcationResult(result, teamApplied);
// (TeamID, ActivityID, ActivityID, ActivityID)
function TeamActivityUpdate(teamToBeUpdated, newActivity, deletedActivity, editedActivity);
// (TeamID, Array of UserID, Array of UserID)
function TeamMemberUpdate(teamToBeUpdated,newMembers,quittedMembers);
// (TeamID, UserID, String)
function TeamPublicMessage(teamToBeUpdated,sender,message);
// (String)
function NewSystemMessage(message);
```

Example code:

```javascript
const NotificationSystem = require("./NotificationSystem");
var notification = new NotificationSystem.JoinRequest(teamToBeJoined, applicant,joinInfo);
var users = [uid1, uid2, uid3];
notification.send(users,(err)=>{
    console.log(err);
});
```

*Note: for NewSystemMessage, its send() do not accept any user parameters (only a callback).*
