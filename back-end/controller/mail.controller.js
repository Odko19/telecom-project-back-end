const imageService = require("../services/mail.services");

const getImageUpload = async (req, res) => {
  try {
    res.json(await imageService.getImageUpload(req));
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

const getArchives = async (req, res) => {
  try {
    res.json(await imageService.getArchives(req));
  } catch (error) {
    console.error(error);
  }
};

const getArchivesList = async (req, res) => {
  try {
    res.json(await imageService.getArchivesList(req));
  } catch (error) {
    console.error(error);
  }
};

const getInboxNewMsg = async (req, res) => {
  try {
    res.json(await imageService.getInboxNewMsg(req));
  } catch (error) {
    console.error(error);
  }
};

const getAllMailType = async (req, res) => {
  try {
    res.json(await imageService.getAllMailType(req));
  } catch (error) {
    console.error(error);
  }
};

/* All mail ADMIN */

const getAllData = async (req, res) => {
  try {
    res.json(await imageService.getAllData());
  } catch (error) {
    console.error(error);
  }
};

const getDataFilter = async (req, res) => {
  try {
    res.json(await imageService.getAllAdminInboxSent(req));
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
  getArchives,
  getArchivesList,
  getDataFilter,
  getInboxNewMsg,
  getAllMailType,
};
