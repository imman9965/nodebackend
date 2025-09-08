const pool = require("../config/db");

const callProcedure = async (procName, params = {}) => {
  const keys = Object.keys(params);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
  const values = Object.values(params);
  const sql = `SELECT * FROM ${procName}(${placeholders})`;
  const { rows } = await pool.query(sql, values);
  return rows;
};

module.exports = { callProcedure };
