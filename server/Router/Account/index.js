var router = require('express').Router();
var logout = require("../../AccountSystem/route/logout");
var login = require("../../AccountSystem/route/login");
var register = require("../../AccountSystem/route/register");
var requestInformation = require("../../AccountSystem/route/requestInformation");
var editInformation = require("../../AccountSystem/route/editInformation");

router.use("/logout",logout);
router.use("/login",login);
router.use("/register",register);
router.use("/requestInformation",requestInformation);
router.use("/editInformation",editInformation);

module.exports = router;
