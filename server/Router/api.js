const router = require("express").Router();
const postFileUpload = require("./Post/fileUpload");
const notification = require("./Notification/notification");


//all routers under /api will be processed here
router.use("/posts/upload",postFileUpload);
router.use("/notifications/", notification);


module.exports = router;
