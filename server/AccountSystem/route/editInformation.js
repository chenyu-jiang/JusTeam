/**
* Project           : JusTeam/server/AccountSystem
*
* Module name      : identity
*
* Author            : WANG Yuxuan
*
* Date created      : 20180317
*
* Purpose           : This module enable uses to modify their personal information.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
* 20180322    WANG Yuxuan      1     Remove restriction on type of information to be edited..
*
**/

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
