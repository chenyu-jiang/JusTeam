# SocketModule Usage

## For Frontend

###Events from client:

* **userJoined:**

```json
//data:
{
    userID: 
    //userName:
    teamID:
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
    userName:
    numberOfUsers:
    usersList: [userName]
}
```
* **newMessage:**
```json
//data:
{
    userName:
    message: //data package
}
```
* **userLeftRoom:**
```json
//data:
{
    userName:
    numberOfUsers:
    usersList: [userName]
}
```
