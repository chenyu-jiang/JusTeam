class Message {
  constructor (timeStamp) {
      if(new.target === Message) throw new TypeError("Abstract Class 'Message' cannot be instantiated.");
      this.timeStamp = timeStamp;
  }

  send(destinations, sendOperation) {
      for(var i = 0; i< destinations.length; i++) {
          sendSingle(destinations[i]);
      }
  }

  sendSingle() {};
}

module.exports = Message;
