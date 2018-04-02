var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var dbCommon = require('../../dbCommon');
var connection = new dbCommon('account');

router.post('/', function(req, res){
    //Test
    var id = req.body.id;
    var item = ['nickname', 'major', 'institution'];
    var ri = new information.requestInfo(item, id);

    if(!req.requestInfo instanceof information.requestInfo) throw new Error("Illigal request!");
    //req.requestInfo.getSearchQuery('information', async (query) => {
    try{
        ri.getSearchQuery('information', async (query) => {
            try{
                var result = await connection.sqlQuery(query);
                res.send(JSON.stringify({editState: true}));
            } catch(err){
                res.send(JSON.stringify({editState: false, editError: error}));
            }
        });
    } catch(err){
        res.send(JSON.stringify({editState: false, editError: error}));
    }


});

module.exports = router;
