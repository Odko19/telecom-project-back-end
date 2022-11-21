const db = require("../db/db");

async function findUser(id) {
  const data = await db.query(
    `SELECT id, office_name, password FROM users where id=?`,
    [id]
  );

  return {
    success: true,
    data,
  };
}

module.exports = {
  findUser,
};
