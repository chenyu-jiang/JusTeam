/**
* Project           : JusTeam/server
*
* Module name      : Instant Message
*
* Author            : JIANG Chenyu
*
* Date created      : 20180302
*
* Purpose           : This module implements the instant message feature.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180315    Michael      1     Removed authentication procedures.
* 20180316    Michael      2     Adjusted interface format.
**/

function instantChat(server) {
    var app = server;
    var io = require('socket.io')(app);
    var identity = require("../AccountSystem/entity/identity");
    var numOfChatRooms = 0;
    var clients={}

    io.on("connection",function (socket) {
        //When client socket is connected to server
        socket.userID = 12345;

        socket.on("userJoined", (data) => {
            //user first joined the room
            if (socket.userName !== undefined) {
                //Not first login
                return;
            }
            //first login, check userID
            console.log()
            if(data.username && data.nickname && data.userID && data.teamID) {
                //initialization
                socket.userName = data.username;
                socket.nickName = data.nickname;
                socket.teamID = data.teamID;
                socket.roomName = "#"+data.teamID;
                socket.userID = data.userID;
                socket.join(socket.roomName);
                if (clients[socket.roomName] === undefined) {
                    clients[socket.roomName] = [];
                }
                //add the client to room list
                clients[socket.roomName].push({"userName": socket.userName,"nickName": socket.nickName, "userID": socket.userID});
                socket.broadcast.to(socket.roomName).emit("userJoinedRoom",{
                    //broadcast a message to all other users informing new user joined
                    user: {
                        userName: socket.userName,
                        nickName: socket.nickName,
                        userID: socket.userID
                    },
                    numberOfUsers: clients[socket.roomName].length,
                    usersList: clients[socket.roomName]
                });
            }
            else {
                socket.emit("failure",{"error":"Incomplete data."});
            }
        });

        socket.on("newMessage", (data)=> {
            //new message sent
            socket.broadcast.to(socket.roomName).emit("newMessage",{
                //broadcast a new message to all other users
                sender: {
                    userName: socket.userName,
                    nickName: socket.nickName,
                    userID: socket.userID,
                },
                message: data
            });
        });

        socket.on("disconnect", ()=> {
            //user disconnected
            if (clients[socket.roomName] === undefined) {
                clients[socket.roomName] = [];
                return;
            }
            else {
                //delete the client from room list
                var index = -1;
                for(var i=0;i<clients[socket.roomName].length;i++) {
                    if(clients[socket.roomName][i].userID = socket.userID) {
                        index = i;
                        break;
                    }
                }
                if(index !== -1) {
                    clients[socket.roomName].splice(index,1);
                }
            }
            socket.broadcast.to(socket.roomName).emit("userLeftRoom",{
                //broadcast a message to all others informing a user have left
                user: {
                    userName: socket.userName,
                    nickName: socket.nickName,
                    userID: socket.userID
                },
                numberOfUsers: clients[socket.roomName].length,
                usersList: clients[socket.roomName]
            });
        });
    });
}

module.exports = instantChat;
