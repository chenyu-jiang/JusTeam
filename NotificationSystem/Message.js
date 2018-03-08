const dbConnection = require("./dbConnection");

class Message {
  constructor () {
      if(new.target === Message) throw new TypeError("Abstract Class 'Message' cannot be instantiated.");
      this.messageType = "";
  }

   async send(users,callback) {
      await dbConnection.establishPool();
      try {
          var messageID = await dbConnection.insertMessageBody(dbConnection.getDBTime(),this.messageType,JSON.stringify(this.content));
          if(users instanceof Array) {
              for(var i=0;i<users.length;i++) {
                  dbConnection.insertUserNotification(dbConnection.getDBTime(),users[i],messageID);
              }
          }
          else dbConnection.insertUserNotification(dbConnection.getDBTime(),users,messageID);
      } catch (err) {
          if(callback !== undefined) {
              callback(err);
          }
      }
  }
}

module.exports = Message;
