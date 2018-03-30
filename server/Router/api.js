var router = require("express").Router();
var postFileUpload = require("./Post/fileUpload");
var notification = require("./Notification/notification");

//all routers under /api will be processed here
router.use("/posts/upload",postFileUpload);
router.use("/notifications/", notification);

module.exports = router;
