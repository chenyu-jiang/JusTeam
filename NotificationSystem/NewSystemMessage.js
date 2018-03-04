const Message = module.require('./Message');

class NewSystemMessage extends Message {
    constructor(timeStamp,message) {
        super(timeStamp);
        this.message = message;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = NewSystemMessage;
