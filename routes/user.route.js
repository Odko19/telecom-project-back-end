const express = require("express");
const router = express.Router();
const officeListController = require("../controller/user.controller")

router.post('/userLogin', officeListController.userLogin);


module.exports = router;