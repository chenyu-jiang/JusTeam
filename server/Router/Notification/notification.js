/**
* Project           : JusTeam/server
*
* Module name       : Router/Notifictaion
*
* Author            : JIANG Chenyu
*
* Date created      : 20180322
*
* Purpose           : Router for notification system, handles noti history and
                      deletion.
*
* Revision History  :
*
* Date        Author      Ref    Revision (Date in YYYYMMDD format)
*
**/

var router = require("express").Router();
var newNotis = require("./new");
var notiInterface = require("../../NotificationSystem/RouterInterface")

router.use("/new", newNotis);

router.get("/history", async (req, res, next) => {
    var userID = req.user.id;
    var start = req.query.start;
    var end = req.query.end;
    if(start && end && userID) {
        var response = await notiInterface.getNotificationHistory(userID, start, end);
        res.send(response);
    }
    else {
        res.setHeader("status",404);
        res.send("Error: Data incomplete.");
    }

});

router.delete("/delete", async (req, res, next) => {
        var userID = req.user.id;
        var messageType = req.query.messageType;
        var messageID = req.query.messageID;
        var response = await notiInterface.deleteNotification(messageID, messageType, userID);
        res.send(response);
    });

module.exports = router;
