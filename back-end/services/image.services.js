const db = require("../db/db");

async function getImageUpload(req) {
  const { office_name_from, office_name_to, subject_txt } = req.body;
  const imgArr = req.files.map((a) => {
    return `http://localhost:3001/uploads/${a.filename}`;
  });
  const data = await db.query(
    "INSERT INTO  data_list ( office_name_from, office_name_to, subject_txt, imgUrl , dateTime_now) VALUES (?, ?, ?, ?, NOW())",
    [
      office_name_from,
      office_name_to,
      subject_txt,
      // `http://10.0.10.102:3001/uploads/${req.files}`,
      imgArr,
    ]
  );
  return {
    success: true,
    data,
  };
}

async function getAllInbox(req) {
  const { office_id } = req.params;
  const data = await db.query(
    `SELECT data_list.id, 
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
    WHERE data_list.office_name_to = ?;`,
    [office_id]
  );

  return {
    success: true,
    data,
  };
}

async function getAllSent(req) {
  const { office_id } = req.params;
  const data = await db.query(
    `SELECT data_list.id, 
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
    WHERE data_list.office_name_from = ?;`,
    [office_id]
  );

  // const data = await db.query(
  //   `SELECT * FROM data_list where office_name_to = ?`,
  //   [officeName]
  // );
  return {
    success: true,
    data,
  };
}

async function getDltData(req) {
  const { dlt } = req.body;
  await dlt.forEach((id) =>
    db.query("DELETE FROM data_list where id = ?", [id])
  );
  return {
    success: true,
    message: `dlt id:[${dlt}]`,
  };
}

async function getArchives(req) {
  const { archives } = req.body;
  await archives.forEach((id) =>
    db.query("UPDATE data_list SET archives=? WHERE id=?", [1, id])
  );
  return {
    success: true,
    message: `archives  id:[${archives}]`,
  };
}

async function getArchivesList(req) {
  const { id } = req.params;
  const data = await db.query(
    `
    SELECT data_list.id,
    data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
    office_from.office_name as office_from,
    office_to.office_name as office_to
    from data_list
    INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
    LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
    WHERE data_list.archives =1 and (data_list.office_name_to = ? or data_list.office_name_from = ?)
    `,
    [id, id]
  );
  return {
    success: true,
    data,
  };
}

/* All mail ADMIN */

async function getAllData() {
  const data = await db.query(
    `SELECT data_list.id, 
  data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
  office_from.office_name as office_from,
  office_to.office_name as office_to
  from data_list
  INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
  LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
  `
  );
  return {
    success: true,
    data,
  };
}

async function getAllAdminInboxSent(req) {
  const { office_id, mail_type, start_date } = req.body;
  // console.log(office_id);
  // console.log(mail_type);
  // console.log(start_date.length);
  let data;
  if (start_date.length === 0) {
    if (mail_type === "office_name_from") {
      data = await db.query(
        `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_from = ? `,
        [office_id]
      );
    }
    if (mail_type === "office_name_to") {
      data = await db.query(
        `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_to =?`,
        [office_id]
      );
    } else {
      if (mail_type === "archives") {
        data = await db.query(
          `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE (data_list.office_name_to =? OR data_list.office_name_from=?) 
      and data_list.archives = ?`,
          [office_id, office_id, 1]
        );
      }
    }
  } else {
    if (mail_type === "office_name_from") {
      data = await db.query(
        `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_from = ? and data_list.dateTime_now > ?`,
        [office_id, start_date]
      );
    }
    if (mail_type === "office_name_to") {
      data = await db.query(
        `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE data_list.office_name_to =? and data_list.dateTime_now > ? ;`,
        [office_id, start_date]
      );
    } else {
      if (mail_type === "archives") {
        data = await db.query(
          `SELECT data_list.id,
      data_list.subject_txt, data_list.imgUrl, data_list.dateTime_now, data_list.archives,
      office_from.office_name as office_from,
      office_to.office_name as office_to
      from data_list
      INNER JOIN office_list office_from ON data_list.office_name_from = office_from.id
      LEFT JOIN office_list office_to ON data_list.office_name_to = office_to.id
      WHERE (data_list.office_name_to =? OR data_list.office_name_from=?) 
      and data_list.archives = ? and data_list.dateTime_now > ?`,
          [office_id, office_id, 1, start_date]
        );
      }
    }
  }
  return {
    success: true,
    data,
  };
}

module.exports = {
  getImageUpload,
  getAllData,
  getAllInbox,
  getAllSent,
  getDltData,
  getArchives,
  getArchivesList,
  getAllAdminInboxSent,
};
