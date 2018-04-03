var router = require("express").Router();
var notiInterface = require("../../NotificationSystem/RouterInterface")

router.get("/content", async (req, res, next) => {
    console.log("New Noti Content GET!!!!");
    var userID = req.user.id;
    var response = await notiInterface.getNewNotification(userID);
    res.send(response);
});

router.get("/number", async(req,res,next)=> {
    console.log("New Noti Number GET!!!!");
    var userID = req.user.id;
    var response = await notiInterface.getNumberOfNewNotification(userID);
    res.send(response);
});

module.exports = router;
