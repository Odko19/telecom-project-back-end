const express = require("express");
const router = express.Router();
const officeListController = require("../controller/user.auth.controller");

router.post("/userLogin", officeListController.userLogin);

module.exports = router;
