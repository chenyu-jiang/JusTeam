/**
* Project           : JusTeam/server/AccountSystem
*
* Module name      : identity
*
* Author            : WANG Yuxuan
*
* Date created      : 20180317
*
* Purpose           : This module provides an entry for front-end to fetch and display personal information.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180322    WANG Yuxuan      1     Change the format of information send.
**/

var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var dbCommon = require('../../dbCommon');
var connection = new dbCommon('accountSystem');

router.post('/', function(req, res){
    //Test
    var id;
    if(req.user !== undefined) id = req.user.id;
    else  {
         res.send(JSON.stringify({requestState: false, error: "No user in cookie"}));
    }
    //else return res.send(JSON.stringify({error: "Cannot get user id"}));
    const identityItem = ['*'];
    const informationItem = ['*'];

    var identityRequest = new information.requestInfo(identityItem, id);
    var informationRequest = new information.requestInfo(informationItem, id);

    //req.requestInfo.getSearchQuery('information', async (query) => {
    var identityResult, informationResult;
    identityRequest.getSearchQuery('identity', async (query) => {
        identityResult = await connection.sqlQuery(query).catch((err)=>{
            return res.send(JSON.stringify({requestState: false, error: err}));
        });

        informationRequest.getSearchQuery('information', async (query) => {
            informationResult = await connection.sqlQuery(query).catch((err)=>{
                return res.send(JSON.stringify({requestState: false, error: err}));
            });;

            var result = Object.assign(identityResult[0], informationResult[0]);
            result.team = JSON.parse(result.team);
            result.post = JSON.parse(result.post);
            var a = {requestState: true, result: result};
            console.log(a);
            res.send({"requestState": true, "result": result});
        });
    });
});

module.exports = router;
