const express = require('express');
const bodyParser = require('body-parser');
const teamOP = require('../../TeamSystem/teamOperation');

var router = express.Router();
//create input interface: {'introduction' : string, 'teamTitle' : string, 'maxMember' = integer , 'category' : string, 'status' : 'string', 'reminder' : string}



router.post('/createTeam',bodyParser.urlencoded({extended: true}),(req,res)=>{
  var userID = req.user.id;
  // TODO: here we get userID by some method
  var body = req.body;
  teamOP.creatTeam(body,(err,result)=>{
    if(err) {
      var a = {state: 'fail'};
      res.send(a);
    }
    else{
      //TODO:accountAttachTeam()
      var jsIn = {userID : user, teamID : result};
      teamOP.addMember(jsIn, (err,result)=>{
        var editJs = {userID : user, teamID : result, newRight: 3};
        if(err){
          var a = {state: 'fail'};
          res.send(a);
        }
        else{
          teamOP.editAuthority(editJs,(err,result)=>{
            if(err){
              var a = {state: 'fail'};
              res.send(a);
            }
            else{
              var a = {state: 'success', insertId: result};
              res.send(a);
            }
          });
        }
      });
    }
  });
});

router.get('/deleteTeam',(req,res)=>{
  //TODO: need to get the accout info
  var deleteId = req.query.teamID;
  var memberList = undefined;
  function askOnce(teamID){
    return new Promise((resolve,reject)=>{
      teamOP.askTeam(teamID,(err,result,fields)=>{
        if(err){
          reject(err);
        }
        else{
          memberList = result.memberList;
          resolve();
        }
      });
    });
  }
  async function f(){
    try{
      await askOnce(deleteId);
      await new Promise((resolve,reject)=>{
        teamOP.deleteTeam(deleteId,(err,result)=>{
          if(err){
            reject(err);
          }
        });
      });
    }
    catch(e){
      var result = {state : 'fail'};
      res.send(result);
    }
  }
  f();
  //TODO: need to implement delete teamID from the teamList in an account; dl();
  for (var i = 0; i < memberList.length; i++){    //NOTE: teamList haven't been implemented now
      async function f(){
        try{
          await askOnce(i);
        }
        catch(e){
          result.state = 0;
        }
      }
      f();
  }

});

router.post('/editTeam', bodyParser.urlencoded({extended: true}), (req,res)=>{
  
});

module.exports = router;
