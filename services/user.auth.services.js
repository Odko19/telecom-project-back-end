const db = require("../db/db");

async function findUser(req) {
  const { office_name, passport } = req.body;
  const data = await db.query(
    `SELECT office_name, passport FROM users where office_name=?`,
    [office_name]
  );

  return {
    data,
  };
}

module.exports = {
  findUser,
};
