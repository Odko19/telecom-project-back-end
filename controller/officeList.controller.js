const officeListService = require("../services/officeList.services");

const officeList = async (req, res) => {
  try {
    res.json(await officeListService.getAllOfficeList());
  } catch (error) {
    console.error(error);
  }
};

module.exports = { officeList };
