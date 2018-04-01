var router = require("express").Router();
var newNotis = require("./new");
var notiInterface = require("../../NotificationSystem/RouterInterface")

router.use("/new", newNotis);

router.get("/history", async (req, res, next) => {
    var userID = req.user.id;
    var start = req.params.start;
    var end = req.params.end;
    var response = await notiInterface.getNotificationHistory(userID, start, end);
    res.send(response);
});

router.delete("/delete", async (req, res, next) => {
        var userID = req.user.id;
        var messageType = req.params.messageType;
        var messageID = req.params.messageID;
        var response = await notiInterface.deleteUserNotification(messageID, messageType, userID);
        res.send(response);
    });

module.exports = router;
