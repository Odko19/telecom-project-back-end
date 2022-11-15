const express = require("express");
const router = express.Router();
const imageUploader = require("../helpers/image-uploader");
const imageController = require("../controller/image.controller");

router.post(
  "/upload",
  imageUploader.upload.single("image"),
  imageController.uploadImage
);
router.get("/upload", imageController.getAllData);
router.get("/sendData/:officeName", imageController.getAllSendData);
router.get("/inboxData/:officeName", imageController.getAllInboxData);

module.exports = router;
