const dbConnection = require("./dbConnection");

class Message {
    constructor() {
        if (new.target === Message) throw new TypeError("Abstract Class 'Message' cannot be instantiated.");
        this.messageType = "";
        this.send = this.send.bind(this);
    }

    async initial(obj) {}

    async send(users, callback) {
        try {
            this.content = await this.initial(this.content);
            this.content = JSON.parse(this.content);
            var messageID = await dbConnection.insertMessageBody(this.messageType, JSON.stringify(this.content));
            if (users instanceof Array) {
                for (var i = 0; i < users.length; i++) {
                    await dbConnection.insertUserNotification(users[i], messageID);
                }
            } else await dbConnection.insertUserNotification(users, messageID);
            callback(null);
        } catch (err) {
            if (callback !== undefined) {
                callback(err);
            }
        }
    }
}

module.exports = Message;
