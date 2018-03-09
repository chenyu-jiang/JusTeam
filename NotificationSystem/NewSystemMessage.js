const Message = require('./Message');
const dbConnection = require('./dbConnection');

class NewSystemMessage extends Message {
    constructor(message) {
        super();
        this.message = message;
    }

    //override
    send(callback) {
        dbConnection.establishPool();
        try {
            var messageID = dbConnection.insertSystemNotification(dbConnection.getDBTime(),this.message);
        } catch (err) {
            if(callback !== undefined) {
                callback(err);
            }
        }
    }
}

module.exports = NewSystemMessage;
