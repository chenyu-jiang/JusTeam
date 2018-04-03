var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var dbCommon = require('../../dbCommon');
var connection = new dbCommon('accountSystem');

router.post('/', function(req, res){
    //Test
    var id;
    if(req.user !== undefined) id = req.user.id;
    else if(req.body !== undefined){
        if(req.body.id !== undefined)
            id = req.body.id;
    }
    else return res.send(JSON.stringify({error: "Cannot get user id"}));
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
            res.send({requestState: true, result: result});
        });
    });
});

module.exports = router;
