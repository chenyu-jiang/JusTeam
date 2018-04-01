function instantChat(server) {
    var app = server;
    var io = require('socket.io')(app);
    var numOfChatRooms = 0;
    var clients={}
    io.on("connection",function (socket) {

        //##########################################
        // TODO: Authentication (cookie checking)
        // Get userName from the cookie itself.
        //##########################################

        //socket.userID = getUserID(); //TODO: implement this in router module
        socket.userID = 12345;
        //socket.userName = getUserName(); //TODO: implement this in router module
        //socket.userName = "Michael";

        socket.on("userJoined", (data) => {
            if (socket.userName !== undefined) {
                //Not first login
                return;
            }
            //first login, check userID
            socket.userName = "Michael";
            //validateUser(user,data.teamID); //TODO: implement this in router module
            socket.teamID = data.teamID;
            socket.roomName = "#"+data.teamID;
            socket.join(socket.roomName);
            if (clients[socket.roomName] === undefined) {
                clients[socket.roomName] = [];
                clients[socket.roomName].push({"userName": socket.userName, "userID": socket.userID});
            }
            socket.broadcast.to(socket.roomName).emit("userJoinedRoom",{
                user: {
                    userName: socket.userName,
                    userID: socket.userID
                },
                numberOfUsers: clients[socket.roomName].length,
                usersList: clients[socket.roomName]
            });
        });

        socket.on("newMessage", (data)=> {
            socket.broadcast.to(socket.roomName).emit("newMessage",{
                sender: {
                    userName: socket.userName,
                    userID: socket.userID,
                },
                message: data
            });
        });

        socket.on("disconnect", ()=> {
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
                    userID: socket.userID
                },
                numberOfUsers: clients[socket.roomName].length,
                usersList: clients[socket.roomName]
            });
        });
    });
}

module.exports = instantChat;
