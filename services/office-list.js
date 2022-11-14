const db = require("../db/db");

async function getAllOfficeLIst() {
    const data = await db.query("SELECT id, office_name FROM office_list");
    return {
      data,
    };
  }

  module.exports = {
    getAllOfficeLIst
  };
  