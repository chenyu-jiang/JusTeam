const Message = module.require('./Message');

class NewApplicationResult extends Message {
    constructor(timeStamp,result,teamApplied) {
        super(timeStamp);
        this.result = result;
        this.teamApplied = teamApplied;
    }

    sendSingle(user) {
        //Override
        //Database Operations
    }
}

module.exports = NewApplicationResult;
