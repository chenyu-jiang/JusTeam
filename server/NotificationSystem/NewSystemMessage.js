/**
* Project           : JusTeam/server
*
* Module name       : SystemMessage-NotifictaionSystem
*
* Author            : JIANG Chenyu
*
* Date created      : 20180301
*
* Purpose           : A Message class used for sending system message to other
                      users.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

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
            var messageID = dbConnection.insertSystemNotification(dbConnection.getDBTime(), this.message);
        } catch (err) {
            if (callback !== undefined) {
                callback(err);
            }
        }
    }
}

module.exports = NewSystemMessage;
