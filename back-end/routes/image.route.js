const express = require("express");
const router = express.Router();
const imageUploader = require("../helpers/image-uploader");
const imageController = require("../controller/image.controller");

router.post(
  "/upload",
  imageUploader.upload.array("image"),
  imageController.getImageUpload
);
router.get("/upload", imageController.getAllData);
router.get("/sent/:office_id", imageController.getAllSent);
router.get("/inbox/:office_id", imageController.getAllInbox);
router.post("/dlt", imageController.getDltData);
router.post("/archives", imageController.getArchives);
router.get("/archivesList/:id", imageController.getArchivesList);
router.post("/filter", imageController.getDataFilter);

module.exports = router;
