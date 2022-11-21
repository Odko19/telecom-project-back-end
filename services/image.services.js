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

async function getAllInbox(req) {
  const { officeName } = req.params;
  const data = await db.query(
    `SELECT * FROM data_list where office_name_to = ?`,
    [officeName]
  );
  return {
    data,
  };
}

async function getAllSent(req) {
  const { officeName } = req.params;
  const data = await db.query(
    `SELECT * FROM data_list where office_name_from = ?`,
    [officeName]
  );
  return {
    data,
  };
}

async function getDltData(req) {
  const { dlt } = req.body;
  await dlt.forEach((id) => {
    return db.query("DELETE FROM data_list where id = ?", [id]);
  });
  return {
    success: true,
    message: `dlt id:[${dlt}]`,
  };
}

module.exports = {
  getImageUpload,
  getAllData,
  getAllInbox,
  getAllSent,
  getDltData,
};
