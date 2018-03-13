var io = require('socket.io')(app); // how do i get the server?

var numOfChatRooms = 0;

io.on("connection",function (socket) {

    //##########################################
    // TODO: Authentication (cookie checking)
    // Get userName from the cookie itself.
    //##########################################

    socket.userID = getUserID(); //TODO: implement this in router module
    socket.userName = getUserName(); //TODO: implement this in router module

    socket.on("userJoined", (data) => {
        if (socket.userName !== undefined) {
            //Not first login
            return;
        }
        //first login
        validateUser(user,data.teamID); //TODO: implement this in router module
        socket.teamID = data.teamID;
        socket.roomName = "#"+data.teamID;
        socket.join(socket.roomName);
        var rooms = io.sockets.adapter.rooms[socket.roomName];
        var users = [];
        for(var i=0;i<rooms.length;i++) {
            users.push({
                userName: rooms[i].userName,
                userID: rooms[i].userID
            });
        }
        socket.broadcast.to(socket.roomName).emit("userJoinedRoom",{
            user: {
                userName: socket.userName,
                userID: socket.userID
            },
            numberOfUsers: rooms.length,
            usersList: users;
        });
    });

    socket.on("newMessage", (data)=> {
        socket.broadcast.to(socket.roomName).emit("newMessage",{
            sender: {
                userName: socket.userName;
                userID: socket.userID;
            },
            message: data
        });
    });

    socket.on("disconnect", ()=> {
        var rooms = io.sockets.adapter.rooms[socket.roomName];
        var users = [];
        for(var i=0;i<rooms.length;i++) {
            users.push({
                userName: rooms[i].userName,
                userID: rooms[i].userID
            });
        }
        socket.broadcast.to(socket.roomName).emit("userLeftRoom",{
            user: {
                userName = socket.userName,
                userID = socket.userID
            },
            numberOfUsers: rooms.length,
            usersList: users
        });
    });

});
