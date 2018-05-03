/**
* Project           : JusTeam/server
*
* Module name       : Message-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message base class used for sending messages. All other
                      message classes inherits from this.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180303    Michael      1     Updated the send function.
**/

const dbConnection = require("./dbConnection");

class Message {
    constructor() {
        if (new.target === Message) throw new TypeError("Abstract Class 'Message' cannot be instantiated.");
        this.messageType = "";
        this.send = this.send.bind(this);
    }

    async initial(obj) {}

    async send(users, callback) {
        //inserts the message body, attach to user notification
        try {
            this.content = await this.initial(this.content);
            this.content = JSON.parse(this.content);
            var messageID = await dbConnection.insertMessageBody(this.messageType, JSON.stringify(this.content));
            if (users instanceof Array) {
                //If users is an array, send to multiple users at a time
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
