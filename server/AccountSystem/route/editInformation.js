var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var dbCommon = require('../../dbCommon');
var connection = new dbCommon('accountSystem');

router.post('/', function(req, res){
    //Validate for user authority here;
    //Then check the validity of requested edition (e.g. information format)
    var id = req.user.id;
    var itemList = ['region', 'gender', 'photo', 'cover', 'introduction', 'career', 'birthday',
                'nickname', 'phone', 'major'];
    var item = [];
    var value = [];

    for(var elements in req.body){
        if(itemList.includes(elements)){
            item.push(elements);
            value.push(req.body[elements]);
        }
    }

    var ei = new information.editItem(id, item, value);
    try{
        ei.getEditQuery('information', async (query) =>{
            try{
                var result = await connection.sqlQuery(query);
                res.send(JSON.stringify({editState: true}));
            } catch(err){
                res.send(JSON.stringify({editState: false, error: err}));
            }
        });
    } catch(err){
        res.send(JSON.stringify({editState: false, error: err}));
    }
});

module.exports = router;
