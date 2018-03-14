var router = require("express").Router();
var postFileUpload = require("./Post/fileUpload");

//all routers under /api will be processed here
router.use("/posts/upload",postFileUpload);

module.exports = router;
