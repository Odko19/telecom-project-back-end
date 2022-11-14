const express = require("express");
const router = express.Router();
const officeList = require("../services/office-list");

router.get("/", async (req, res) => {
  try {
    res.json(await officeList.getAllOfficeLIst());
  } catch (err) {
    console.error(err.messeage);
  }
});

module.exports = router;