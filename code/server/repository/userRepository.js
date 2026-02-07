import db from "../config/db.js";

export const createUser = async (data) => {
  const conn = await db();
  const query = `INSERT INTO users (name,email,phone,address,pincode,password_hash,role_id,apartment_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log("Creating user with data:", data);
  const [result] = await conn.execute(query, [
    data.name,
    data.email,
    data.phone,
    data.address,
    data.pincode,
    data.password,
    data.role_id,
    data.apartment_id ?? null,
  ]);
  return result;
};

export const getUserById = async (id) => {
  const connectDB = await db();
  const query = `SELECT * FROM temp_test1 WHERE id = ?`;
  const [rows] = await connectDB.execute(query, [id]);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const connectDB = await db();
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await connectDB.execute(query, [email]);

  return rows[0];
};
