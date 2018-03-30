var express = require('express');
var router = express.Router();
var information = require('../entity/information');
var connection = require('../entity/dbConnection');

router.post('/editInformation', function(req, res){
    //Validate for user authority here;

    //Then check the validity of requested edition (e.g. information format)
    if(!req.editItem instanceof information.editItem) throw new Error("Illigal edit request!");

    var editItem = req.editItem;
    connection.connect(function(err){
        if(err) throw err;
    });

    connection.query('USE account', function(err, results, fields){
        if(err) throw err;
        var query = editItem.getEditQuery('information');
        connection.query(query, function (err, results, fields) {
            if(err) throw err;
            else{
                //Notify the user for successfully updated.
            }
        });
    })

});

