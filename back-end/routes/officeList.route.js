const express = require("express");
const router = express.Router();
const officeListController = require("../controller/officeList.controller")

router.get('/', officeListController.officeList);


module.exports = router;