# Chat Module Usage

## For Frontend

## Socket.io

### Events from client:

* **userJoined:**

```json
//data: user will join this team's chatroom
{ 
    "teamID": 12345,
    "userID": 123,
    "nickname": "Nick",
    "username": "username"
}
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
    "user": {"userName": "JusTeam", "nickName": "Nick","userID": 123},
    "numberOfUsers": 2,
    "usersList": [{
        "nickName": "JusTeam",
        "userName": "root",
        "userID": 456
    }]
}
```
* **newMessage:**
```json
//data: user is the message sender
{
    "user": {"userName": "JusTeam", "nickName" : "Nick","userID": 123},
    "message": {"data package": "data package"}
}
```
* **userLeftRoom:**
```json
//data:
{
    "user": {"userName": "JusTeam", "nickName" : "Nick", "userID": 123},
    "numberOfUsers": 2,
    "usersList": [{
        "nickName": "JusTeam",
        "userName": "root",
        "userID": 456
    }]
}
```

* **unauthorized**

```json
{"status": false}
```

* **authorized**

```json
//empty
```

* **failure**

```json
{"error": "message"}
```

## Others

* getChatHistory(teamID)
```json
//Returns the chat history
//to be defined
```
