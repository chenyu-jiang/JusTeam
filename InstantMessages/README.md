# Chat Module Usage

## For Frontend

## Socket.io

### Events from client:

* **userJoined:**

```json
//data: user will join this team's chatroom
{ "teamID": 12345 }
```

* **newMessage:**
```json
//data: whatever in this will be broadcast to other users
{ "anything": "anything" }
```
### Events from server:

* **userJoinedRoom:**
```json
//data:
{
    "user": {"userName": "JusTeam", "userID": 123},
    "numberOfUsers": 2,
    "usersList": [{"userName": "JusTeam", "userID": 456}]
}
```
* **newMessage:**
```json
//data: user is the message sender
{
    "user": {"userName": "JusTeam", "userID": 123},
    "message": {"data package": "data package"}
}
```
* **userLeftRoom:**
```json
//data:
{
    user: {"userName": "JusTeam", "userID": 123},
    numberOfUsers: 2,
    usersList: [{"userName": "JusTeam", "userID": 456}]
}
```

## Others 

* getChatHistory(teamID)
```json
//Returns the chat history
//to be defined
```