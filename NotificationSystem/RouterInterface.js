const NotificationSystem = require("./NotificationSystem");
const db = require("./dbConnection");

//all errors must be handled at this level.
async function processNotification(notifObject,msgArray) {
    return new Promise(async (resolve,reject)=>{
        try{
            //read message
            var msgContent = await db.getMessageBody(notifObject.message);
            var resContent = {
                messageID: notifObject.notification_ID,
                messageType: msgContent.messageType,
                timeStamp: msgContent.timeStamp,
                content: msgContent.content
            }
            msgArray.push(resContent);
            resolve();
        }
        catch(err) {
            reject();
        }
    });
}

//wrapper method for parallel awaiting
async function parallelProcessing(notis,msgArray) {
    var tmp = [];
    for(var i=0;i<notis.length;i++) {
        //process notifications asynchronously.
        tmp.push(processNotification(notis[i],msgArray));
    }
    await Promise.all(tmp);
}

function compareNotif(not1,not2) {
    var t1 = Date.parse(not1.timeStamp);
    var t2 = Date.parse(not2.timeStamp);
    if (t1 > t2) return -1;
    else if (t1 === t2) return 0;
    else return 1;
}

exports.getNewNotification = async function getNewNotification(user) {
    //construct response object
    var response = {
        "status": true,
        "error": "",
        "numOfMessages": 0,
        "messages": []
    };
    var notis;
    //get UserNotifications
    try{
        //getUserNotification
        notis = await db.getNewUserNotification(user);
        if(notis === undefined) throw new Error("[DB Error] - Cannot get content.");
        //process notifications asynchronously.
        await parallelProcessing(notis,response.messages);
        response.numOfMessages = notis.length;
        response.messages.sort(compareNotif);
        return response;
    }
    catch(err) {
        console.log(err);
        response.status = false;
        response.error = err;
        return response;
    }
}

exports.getNumberOfNewNotification = async function getNumberOfNewNotification(user) {
    //construct response object
    var response = {
        "status": true,
        "error": "",
        "numOfMessages": 0,
    };
    //get numberOfNewNotifications
    try {
        var number = undefined;
        number = await db.getNumberOfNewUserNotification(user);
        if (number === undefined) {
            throw new Error("[DB Error] - Cannot get number of New User Notifications.");
        }
        response.numOfMessages = number;
        return response;
    }
    catch(err) {
        console.log(err);
        response.status = false;
        response.error = err;
        return response;
    }
}

exports.getNotificationHistory = async function getNotificationHistory(user, start, end) {
    //construct response object
    var response = {
        "status": true,
        "error": "",
        "numOfMessages": 0,
        "messages": []
    };
    var notis;
    //get UserNotifications
    try{
        //getUserNotification
        notis = await db.getUserNotification(user,start,end);
        if(notis === undefined) throw new Error("[DB Error] - Cannot get content.");
        //process notifications asynchronously
        await parallelProcessing(notis,response.messages);
        response.numOfMessages = notis.length;
        response.messages.sort(compareNotif);
        return response;
    }
    catch(err) {
        console.log(err);
        response.status = false;
        response.error = err;
        return response;
    }
}

exports.deleteNotification = async function deleteNotification(messageID) {
    //construct response object
    var response = {
        "status": true,
        "error": "",
    };
    try {
        await db.deleteUserNotification(messageID);
        return response;
    }
    catch(err) {
        console.log(err);
        response.status = false;
        response.error = err;
        return response;
    }
}
