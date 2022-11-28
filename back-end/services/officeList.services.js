const db = require("../db/db");

async function getAllOfficeList() {
  const data = await db.query("SELECT id, office_name FROM office_list");

  return {
    success: true,
    data,
  };
}

module.exports = {
  getAllOfficeList,
};
