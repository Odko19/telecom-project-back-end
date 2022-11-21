const imageService = require("../services/image.services");

const getImageUpload = async (req, res) => {
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

const getAllSent = async (req, res) => {
  try {
    res.json(await imageService.getAllSent(req));
  } catch (error) {
    console.error(error);
  }
};

const getAllInbox = async (req, res) => {
  try {
    res.json(await imageService.getAllInbox(req));
  } catch (error) {
    console.error(error);
  }
};

const getDltData = async (req, res) => {
  try {
    res.json(await imageService.getDltData(req));
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getImageUpload,
  getAllData,
  getAllSent,
  getAllInbox,
  getDltData,
};
