var router = require("express").Router();
var notiInterface = require("../../NotificationSystem/RouterInterface")

router.get("/content", async (req, res, next) => {
    //TODO: implement getUserID;
    var userID = getUserID();
    var response = await notiInterface.getNewNotification(userID);
    res.write(JSON.stringify(response));
    res.end();
});

router.get("/number", async(req,res,next)=> {
    //TODO: implement getUserID;
    var userID = getUserID();
    var response = await notiInterface.getNumberOfNewNotification(userID);
    res.write(JSON.stringify(response));
    res.end();
});

module.exports = router;
