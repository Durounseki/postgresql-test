const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsernames(searchTerm){
    const query ={
        text: "SELECT * FROM usernames WHERE username ILIKE $1",
        values: [`%${searchTerm}%`]
    };
    const result = await pool.query(query);
    return result.rows;
}

async function deleteUsernames(){
    await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsernames,
  deleteUsernames
};
