const db = require("../db/db");

async function getImageUpload(req) {
  const { office_name_from, office_name_to, subject_txt } = req.body;
  const data = await db.query(
    "INSERT INTO  data_list ( office_name_from, office_name_to, subject_txt, imgUrl) VALUES (?, ?, ?, ?)",
    [
      office_name_from,
      office_name_to,
      subject_txt,
      `http://localhost:3001/uploads/${req.file.filename}`,
    ]
  );
  return {
    data,
  };
}

async function getAllData() {
  const data = await db.query(`SELECT * FROM data_list `);
  return {
    data,
  };
}

async function getAllSendData(req) {
  const { officeName } = req.params;
  const aasd = officeName;
  console.log(aasd);
  const data = await db.query(
    `SELECT * FROM data_list where office_name_to = ?`,
    [aasd]
  );

  return {
    data,
  };
}

async function getAllInboxData(req) {
  const { officeName } = req.params;
  const aasd = officeName;
  console.log(aasd);
  const data = await db.query(
    `SELECT * FROM data_list where office_name_from = ?`,
    [aasd]
  );

  return {
    data,
  };
}

module.exports = {
  getImageUpload,
  getAllData,
  getAllSendData,
  getAllInboxData,
};
