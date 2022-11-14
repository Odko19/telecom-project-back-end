const express = require("express");
const router = express.Router();
const imageUploader = require('../helpers/image-uploader');
const imageController = require("../controller/image.controller")

router.post('/upload', imageUploader.upload.single('image'), imageController.uploadImage);


module.exports = router;