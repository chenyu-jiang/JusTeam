/**
* Project           : JusTeam/server
*
* Module name       : teamInfo
*
* Author            : DENG ShiYuan
*
* Date created      : 20180322
*
* Purpose           : Router for teamInformation operation
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180323    DENG ShiYuan      1     Fixed bug in router getUserTeams.
**/

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

//return one user's all teams
router.get('/getUserTeams',(req,res)=>{
  /*function down(x, y) {
    return (x.age < y.age) ? 1 : -1
  }
  teams.sort(down);*/
  var l = req.query.teamList;
  l = '['+l+']';
  var teamList = JSON.parse(l);
  var teams = [];
  var aimUser = undefined;
  var results = {state : 'all'};
  var counter = 0;
  teamList.forEach((id)=>{
      teamOP.askTeam(id, (err,result)=>{
      if(err){
        results.state = 'part';
      }
      else{
        teams.push(result);
        counter++;
        if(counter===teamList.length) {
            results.teams = teams;
            res.send(results);
        }
      }
    });
  });
  });

//return one team information due to the input from client side
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
