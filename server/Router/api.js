var router = require("express").Router();
var posts = require("./Post");
var notification = require("./Notification/notification");
var search = require("./Search");
var teamOP = require("./Team/teamOP");
var teamInfo = require("./Team/teamInfo");
var eventOP = require("./Event/eventOP");
var eventInfo = require("./Event/eventInfo");



//all routers under /api will be processed here
router.use("/posts",posts);
router.use("/notifications", notification);
router.use("/search", search);
router.use("/team/teamOP",teamOP);
router.use("/team/teamInfo",teamInfo);
router.use("/event/eventInfo",eventInfo);
router.use("/event/eventOP",eventOP);


module.exports = router;
