const Message = module.require('./Message');

class NewApplicationResult extends Message {
    constructor(result,teamApplied) {
        super();
        this.content = {
            'result': result,
            'teamApplied': teamApplied
        }
        this.messageType = "NewApplicationResult";
    }
}

module.exports = NewApplicationResult;
