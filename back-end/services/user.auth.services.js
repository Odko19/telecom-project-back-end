const db = require("../db/db");

async function findUser(id) {
  const data = await db.query(
    `select office_list.id, office_list.office_name,password
    from office_list
    inner join users
    ON office_list.id = users.id where office_list.id=?`,
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
