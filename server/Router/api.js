var router = require("express").Router();
var postFileUpload = require("./Post/fileUpload");
var notification = require("./Notification/notification");
var search = require("./Search");

//all routers under /api will be processed here
router.use("/posts/upload",postFileUpload);
router.use("/notifications", notification);
router.use("/search", search);

module.exports = router;
