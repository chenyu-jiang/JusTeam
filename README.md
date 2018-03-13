# JusTeam
Development of future software engineers.

## Internal Usage

### Notification system

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
//function NewSystemMessage(message); (Not Supported in early stage)
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

*__Note__: for NewSystemMessage, its send() do not accept any user parameters (only a callback).*

#### Router Interfaces

* getNumberOfNewNotifications(user);
```json
//Response Format: JSON
{
    "status": (boolean),
    "error": (string),
    "numOfMessages": (int)
}
```
*__Note:__ This will not set the notifications' status as "viewed". (They will be included in the next call of this function).*

* getNewNotification(user);

```json
//Response Format: JSON
{
    "status": (boolean),
    "error": (string),
    "numOfMessages": (int),
    "messages": [
        {
            "messageID" : (int),
            "messageType": (String),
            "timeStamp" : (ISO date format String),
            "content": (JSON),
        },
        {
            //...
        },
        //...
    ]
}
```

*__Note__: This will set these notofications' status as "viewed". (They will not be included in the next call of this function).*

* getNotificationHistory(user, start, end);
```json
//Response Format: JSON
//Returns the notification history by time order (newest first) from "start" (included) to "end" (included)
//Records starts from 0
//Same as getNewNotification();
```

* deleteNotification(messageID, messageType, userID);

```json
//Response Format: JSON
{
    "status": (boolean),
    "error": (String)
}
```

*__Note__: SystemMessages must not be deleted by a normal user.*