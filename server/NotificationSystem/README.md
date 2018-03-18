# Notification system

## Notification Types:
```js
    // (TeamID, UserID, String)
    function JoinRequest(teamToBeJoined, applicant, joinInfo) {};
    // (boolean, TeamID)
    function NewAppcationResult(result, teamApplied) {};
    // (TeamID, ActivityID, ActivityID, ActivityID)
    function TeamActivityUpdate(teamToBeUpdated, newActivity, deletedActivity, editedActivity) {};
    // (TeamID, Array of UserID, Array of UserID)
    function TeamMemberUpdate(teamToBeUpdated,newMembers,quittedMembers) {};
    // (TeamID, UserID, String)
    function TeamPublicMessage(teamToBeUpdated,sender,message) {};
    // (String)
    //function NewSystemMessage(message); (Not Supported in early stage)
```

### Example code:

```javascript
const NotificationSystem = require("./NotificationSystem");
var notification = new NotificationSystem.JoinRequest(teamToBeJoined, applicant,joinInfo);
var users = [uid1, uid2, uid3];
notification.send(users,(err)=>{
    console.log(err);
});
```

_**Note:** for NewSystemMessage, its send() do not accept any user parameters (only a callback)._

## Router Interfaces

- getNumberOfNewNotifications(user);
```json
    //Response Format: JSON
    {
        "status": true,
        "error": "Error message (string)",
        "numOfMessages": 5
    }
```
*__Note__: This will **NOT** set the notifications' status as "viewed". (They will be included in the next call of this function).*

- getNewNotification(user);
```json
    //Response Format: JSON
    {
        "status": true,
        "error": "Error message (string)",
        "numOfMessages": 5,
        "messages": [
            {
                "messageID" : 12306,
                "messageType": "JoinRequest",
                "timeStamp" : "2018-03-08T10:02:25.000Z //ISO standard",
                "content": {},
            },
            {
               "...": "..."
            },
            {
               "...": "..."
            },
        ]
    }
```
_**Note**: This __will__ set these notofications' status as "viewed". (They will not be included in the next call of this function)._

- getNotificationHistory(user, start, end);
```json
    //Response Format: JSON
    //Returns the notification history by time order (newest first) from "start" (included) to "end" (included)
    //Records starts from 0
    //Same as getNewNotification();
```
- deleteNotification(messageID, messageType, userID);
```json
    //Response Format: JSON
    {
        "status": true,
        "error": "Error message (String)"
    }
```
_**Note:** SystemMessages must not be deleted by a normal user._
