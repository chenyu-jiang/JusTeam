var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var connection = require('../view/dbConnection');

router.get('/requestInformation', function(req, res){
    //Validate for user authority here;

    //Then check the validity of requested edition (e.g. information format)
    if(!req.requestInfo instanceof information.requestInfo) throw new Error("Illigal request!");

    var editItem = req.editItem;
    connection.connect(function(err){
        if(err) throw err;
    });

    connection.query('USE account', function(err, results, fields){
        if(err) throw err;
        var query = req.requestInfo.getSearchQuery('information');
        connection.query(query, function (err, results, fields) {
            if(err) throw err;
            else{
                //Notify the user for successfully updated.
            }
        });
    })

});

