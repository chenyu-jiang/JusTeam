function instantChat(server) {
    var app = server;
    var io = require('socket.io')(app);
    var numOfChatRooms = 0;
    var clients={}

    io.on("connection",function (socket) {
        socket.auth = undefined;

        socket.on("authentication", (data)=> {
            var status = false;
            //Check
            if(data.username === "Bob" && data.password === "Hunter2") status = true;
            if(!status) {
                socket.emit("unauthorized", {"status": false});
            }
            else socket.auth = true;
        });

        socket.userID = 12345;

        socket.on("userJoined", (data) => {
            if(socket.auth){
                if (socket.userName !== undefined) {
                    //Not first login
                    return;
                }
                //first login, check userID
                socket.userName = data.username;
                socket.nickName = data.nickname;
                socket.teamID = data.teamID;
                socket.roomName = "#"+data.teamID;
                socket.join(socket.roomName);
                if (clients[socket.roomName] === undefined) {
                    clients[socket.roomName] = [];
                }
                clients[socket.roomName].push({"userName": socket.userName,"nickName": socket.nickName, "userID": socket.userID});
                socket.broadcast.to(socket.roomName).emit("userJoinedRoom",{
                    user: {
                        userName: socket.userName,
                        nickName: socket.nickName,
                        userID: socket.userID
                    },
                    numberOfUsers: clients[socket.roomName].length,
                    usersList: clients[socket.roomName]
                });
            }
        });

        socket.on("newMessage", (data)=> {
            if(socket.auth){
                socket.broadcast.to(socket.roomName).emit("newMessage",{
                    sender: {
                        userName: socket.userName,
                        nickName: socket.nickName,
                        userID: socket.userID,
                    },
                    message: data
                });
            }
        });

        socket.on("disconnect", ()=> {
            socket.auth = false;
            if (clients[socket.roomName] === undefined) {
                clients[socket.roomName] = [];
                return;
            }
            else {
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
