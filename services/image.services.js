const db = require("../db/db");

async function getImageUpload(req) {
  const { office_name_from, office_name_to, subject_txt } = req.body;
  const data = await db.query(
    "INSERT INTO  data_list ( office_name_from, office_name_to, subject_txt, imgUrl , dateTime_now) VALUES (?, ?, ?, ?, NOW())",
    [
      office_name_from,
      office_name_to,
      subject_txt,
      `http://localhost:3001/uploads/${req.file.filename}`,
    ]
  );
  return {
    success: true,
    data,
  };
}

async function getAllData() {
  const data = await db.query(`SELECT * FROM data_list `);
  return {
    data,
  };
}

async function getAllInboxData(req) {
  const { officeName } = req.params;
  const data = await db.query(
    `SELECT * FROM data_list where office_name_to = ?`,
    [officeName]
  );

  return {
    data,
  };
}

async function getAllSendData(req) {
  const { officeName } = req.params;
  const data = await db.query(
    `SELECT * FROM data_list where office_name_from = ?`,
    [officeName]
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
