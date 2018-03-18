var dbConnection = require('dbConnection.js');

function generalInfo(location, age, career, mobile) {
    this.location = location;
    this.age = age;
    this.career = career;
    this.mobile = mobile;
};

class requestInfo{
    constructor(item, id, callBack){
        if(!item instanceof Array)  callBack(Error("Invalid input!"));
        this.item = item;
        this.id = id;
    }

    getID(){
        return this.id;
    }

    getSearchQuery(tableName, callBack){
        if(tableName instanceof String) callBack(Error("Invalid table name!"));
        else{
            var query = 'SELECT ';
            for(var i = 0; i < item.length; i++) {
                query += item[i];
                if(i != item.length - 1) query += ', ';
            }
            query += 'FROM ' + tableName;
            return query;
        }
    }
}

class editItem{
    constructor(id, item, value, callBack){
        if(item instanceof Array && value instanceof Array && item.length == value.length)
        {
            this.item = item;
            this.value = value;
            this.id = id;
        }
        callBack(new Error("Input is not matched!"));
    }

    getID(){
        return this.id;
    }

    getEditQuery(tableName, callBack){
        if(!tableName instanceof String) callBack(new Error("Invalid input"));
        var query = 'UPDATE' + tablename + 'SET ';
        for(var i = 0; i < this.item.length; i++){
            query += editItem.item[i] + ' = ' + '\'' + editItem.value[i] + '\'';
            if(i != this.item.length - 1) query += ', ';
        }
        query += 'WHERE id = ' + this.id;
        return query;
    }
}

module.exports = {
    editItem: editItem,
    requestInfo: requestInfo
};

