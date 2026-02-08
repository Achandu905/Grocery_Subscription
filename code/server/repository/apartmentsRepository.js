import db from "../config/db.js";
export const addApartment = async (data) => {
  const connectDB = await db();
  const query = `INSERT INTO apartments (name, pincode, address,city) VALUES (?, ?, ?,?)`;
  const [result] = await connectDB.execute(query, [
    data.name,
    data.pincode,
    data.address,
    data.city,
  ]);
  return result;
};

export const getAllApartments = async () => {
  const connectDB = await db();
  const query = `SELECT * FROM apartments`;
  const [rows] = await connectDB.execute(query);
  return rows;
};

export const getApartmentById = async (id) => {
  const connectDB = await db();
  const query = `SELECT * FROM apartments WHERE id = ?`;
  const [rows] = await connectDB.execute(query, [id]);
  return rows[0];
};

export const updateApartment = async (id, data) => {
  const connectDB = await db();
  const query = `UPDATE apartments SET name = ?, pincode = ?, address = ?, city = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [
    data.name,
    data.pincode,
    data.address,
    data.city,
    id,
  ]);
  return result;
};

export const deleteApartment = async (id) => {
  const connectDB = await db();
  const query = `DELETE FROM apartments WHERE id = ?`;
  const [result] = await connectDB.execute(query, [id]);
  return result;
};
