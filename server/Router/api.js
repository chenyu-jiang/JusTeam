var router = require("express").Router();
var posts = require("./Post");
var notification = require("./Notification/notification");
var search = require("./Search");

//all routers under /api will be processed here
router.use("/posts",posts);
router.use("/notifications", notification);
router.use("/search", search);

module.exports = router;
