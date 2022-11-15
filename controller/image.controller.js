const imageService = require("../services/image.services");

const uploadImage = async (req, res) => {
  try {
    res.json(await imageService.getImageUpload(req));
  } catch (error) {
    console.error(error);
  }
};

const getAllData = async (req, res) => {
  try {
    res.json(await imageService.getAllData());
  } catch (error) {
    console.error(error);
  }
};

const getAllSendData = async (req, res) => {
  try {
    res.json(await imageService.getAllSendData(req));
  } catch (error) {
    console.error(error);
  }
};

const getAllInboxData = async (req, res) => {
  try {
    res.json(await imageService.getAllInboxData(req));
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadImage, getAllData, getAllSendData, getAllInboxData };
