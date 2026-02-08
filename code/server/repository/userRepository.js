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

export const getAllUsers = async () => {
  const connectDB = await db();
  const query = `SELECT * FROM users`;
  const [rows] = await connectDB.execute(query);
  return rows;
};

export const updateUser = async (id, data) => {
  const connectDB = await db();
  const query = `UPDATE users SET name = ?, email = ?, phone = ?, address = ?, pincode = ?, password_hash = ?, role_id = ?, apartment_id = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [
    data.name,
    data.email,
    data.phone,
    data.address,
    data.pincode,
    data.password,
    data.role_id,
    data.apartment_id ?? null,
    id,
  ]);
  return result;
};

export const deleteUser = async (id) => {
  const connectDB = await db();
  const query = `DELETE FROM users WHERE id = ?`;
  const [result] = await connectDB.execute(query, [id]);
  return result;
};

export const storeOtp = async (email, otp, expiry) => {
  const connectDB = await db();
  const query = `UPDATE users SET reset_otp = ?, reset_otp_expiry = ? WHERE email = ?`;
  const [result] = await connectDB.execute(query, [otp, expiry, email]);
  return result;
};

export const updatePassword = async (id, newPassword) => {
  const connectDB = await db();
  const query = `UPDATE users SET password_hash = ?, reset_otp = NULL, reset_otp_expiry = NULL WHERE id = ?`;
  const [result] = await connectDB.execute(query, [newPassword, id]);
  return result;
};
