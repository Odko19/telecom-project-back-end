const express = require("express");
const router = express.Router();
const imageUploader = require("../helpers/image-uploader");
const imageController = require("../controller/image.controller");

router.post(
  "/upload",
  imageUploader.upload.single("image"),
  imageController.getImageUpload
);
router.get("/upload", imageController.getAllData);
router.get("/sent/:officeName", imageController.getAllSent);
router.get("/inbox/:officeName", imageController.getAllInbox);
router.post("/dlt", imageController.getDltData);

module.exports = router;
