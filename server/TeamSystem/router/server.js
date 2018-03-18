const express = require('express');
const bodyParser = require('body-parser');

var app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
  res.send('hello world');
  console.log('get le');
});

app.post('/',(req,res)=>{
  console.dir(req.body);
  res.send('ok');
  res.end();
});

app.listen(8080);

console.log('listening');
