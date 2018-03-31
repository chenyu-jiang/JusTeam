var dbCommon = require('../../dbCommon');

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
        if(tableName instanceof String) throw new Error("Invalid table name!");
        else{
            var query = 'SELECT ';
            for(var i = 0; i < this.item.length; i++) {
                query += this.item[i];
                if(i != this.item.length - 1) query += ', ';
            }
            query += ' FROM ' + tableName + ' WHERE id = ' + this.id;
            callBack (query);
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
        if(!tableName instanceof String) throw new Error("Invalid input");
        var query = 'UPDATE ' + tableName + ' SET ';
        for(var i = 0; i < this.item.length; i++){
            query += this.item[i] + ' = ' + '\'' + this.value[i] + '\'';
            if(i != this.item.length - 1) query += ', ';
        }
        query += ' WHERE id = ' + this.id;
        callBack(query);
    }
}

module.exports = {
    editItem: editItem,
    requestInfo: requestInfo
};

