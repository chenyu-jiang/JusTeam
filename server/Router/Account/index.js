var router = require('express').Router();
var logout = require("../AccountSystem/route/logout");
var login = require("../AccountSystem/route/login");
var register = require("../AccountSystem/route/register");
var requestInformation = require("../AccountSystem/route/requestInformation");
var editInformation = require("../AccountSystem/route/editInformation");

router.use("/account/logout",logout);
router.use("/account/login",login);
router.use("/account/register",register);
router.use("/account/requestInformation",requestInformation);
router.use("/account/editInformation",editInformation);

module.exports = router;
