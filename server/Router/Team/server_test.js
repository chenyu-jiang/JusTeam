const express = require('express');
const bodyParser = require('body-parser');

var server = express().Router();

server.get('/homepage',(req,res)=>{
  res.write('mother fucker');
  res.write('father fucker');
  res.end();
});

server.get('/homepage/aaa',(req,res)=>{
  res.write('keke');
  res.end();
});

module.exports = server;
