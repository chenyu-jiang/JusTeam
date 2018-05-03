const express = require('express');
const eventOP = require('./eventOP');
const eventInfo = require('./eventInfo');

var server = express();



server.use('/event/eventOP',eventOP);
server.use('/event/eventInfo',eventInfo);

server.get('/',(req,res)=>{
  res.send('surprise mother fucker!!!');
});

console.log('listening');

server.listen(8080);
