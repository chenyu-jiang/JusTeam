# Chat Module Usage

## For Frontend

## Socket.io

###Events from client:

* **userJoined:**

```json
//data:
{
    teamID: //user will join the chatroom of this team
}
```

* **newMessage:**
```json
//data:
{
    // whatever in this will be broadcast to other users
}
```
###Events from server:

* **userJoinedRoom:**
```json
//data:
{
    user: {userName, userID}
    numberOfUsers:
    usersList: [{userName, userID}]
}
```
* **newMessage:**
```json
//data:
{
    user: {userName, userID} //sender
    message: //data package
}
```
* **userLeftRoom:**
```json
//data:
{
    user: {userName, userID}
    numberOfUsers:
    usersList: [userName]
}
```

## Others 

* getChatHistory(teamID)
```json
//Returns the chat history
//to be defined
```