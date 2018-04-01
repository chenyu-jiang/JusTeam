var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var dbCommon = require('../../dbCommon');
var connection = new dbCommon('account');

router.post('/', function(req, res){
    //Validate for user authority here;
    //Then check the validity of requested edition (e.g. information format)
    var id = 26;
    var item = ['nickname', 'institution'];
    var value = [];
    value.push(req.body.nickname);
    value.push(req.body.institution);

    var ei = new information.editItem(id, item, value, (err) => {

    });

    //if(!req.editItem instanceof information.editItem) throw new Error("Illigal edit request!");

    //var editItem = req.editItem;
    try{
        ei.getEditQuery('information', async (query) =>{
            try{
                var result = await connection.sqlQuery(query);
                res.send(JSON.stringify({editState: true}));
            } catch(err){
                res.send(JSON.stringify({editState: false, editError: err}));
            }
        });
    } catch(err){
        res.send(JSON.stringify({editState: false, editError: err}));
    }
});

module.exports = router;

