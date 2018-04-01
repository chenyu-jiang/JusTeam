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
//TODO:
router.get('/getUserTeams',(req,res)=>{
  var teamList = JSON.parse(req.query.teamList);
  var teams = [];
  var aimUser = undefined;
  function askOnce(var_i){
    return new Promise((resolve,reject)=>{
      teamOP.askTeam(teamList[var_i],(err,result,fields)=>{
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
  var result = {state: 'all'};
  var i = undefined;
  for (i = 0; i < teamList.length; i++){    //NOTE: teamList haven't been implemented now
      async function f(){
        try{
          var a = i;
          await askOnce(i);
          if(a == teamList.length - 1){
            result.teams = teams;
            res.send(result);
          }
        }
        catch(e){
          result.state = 'part';
          console.log(i);
          if(i == teamList.length - 1){
            function down(x, y) {
              return (x.age < y.age) ? 1 : -1
            }
            teams.sort(down);
            result.teams = teams;
            res.send(result);
          }
        }
      }
      f();
  }
  //TODO: need to reorder the teams
});
//TODO: reorder
router.get('/viewOneTeam',(req,res)=>{
  var aimTeam = parseInt(req.query.teamID);   //NOTE: here we require a teamID in the head
  teamOP.askTeam(aimTeam,(err,result, fields)=>{
    if(err){
      var a = {state : 'fail'};
      res.send(a);
    }
    else{
      var a = {state : 'success'};
      a.team = result;
      res.send(a);
    }
  });
});

module.exports = router;
