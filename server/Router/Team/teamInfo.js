const express = require('express');
const bodyParser = require('body-parser');
const teamOP = require('../../TeamSystem/teamOperation');

var router = express.Router();

router.get('/getRecommend',(req,res)=>{
  //TODO: implement function getRecommandTeam()
  //      pseudocode: some how get the recommandTeams
  var recommendTeams = getRecommendTeam();
  res.send(recommendTeams);
});

router.get('/getUserTeams',(req,res)=>{
  var teams = [];
  var aimUser = undefined;
  //TODO: miss passport middleware
  //TODO: somehow get the account information according to the userID
  function askOnce(var_i){
    return new Promise((resolve,reject)=>{
      teamOP.askTeam(aimUser.teams.IDList[var_i],(err,result,fields)=>{
        if(err){
          reject(err);
        }
        else{
          teams.push(result);
          resolve();
        }
      });
    });
  }
  var result = {state: 1}; //NOTE:state is 1 means all teams are loaded, state is 0 means not all teams is loaded

  for (var i = 0; i < aimUser.teams.IDList; i++){    //NOTE: teamList haven't been implemented now

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

  //TODO: need to reorder the teams

  result.teams = teams;
  res.send(result);
});

router.get('/viewOneTeam',(req,res)=>{
  var aimTeam = req.query.teamID;   //NOTE: here we require a teamID in the head

  async function getOneTeam(){
    try{
      await new Promise((resolve,reject)=>{
        teamOP.askTeam(aimTeam,(err,result,fields)=>{
          var a = {state : 'success'};
          a.team = result;
          res.send(a);
        });
      });
    }
    catch(e){
        var a = {state : 'fail'};
        res.send(a);
    }
  }
  getOneTeam();
});

module.exports = router;
