import db from "../config/db.js";

/* CREATE PRODUCT */
export const addProduct = async (data) => {
  const connectDB = await db();
  const query = `
    INSERT INTO products 
    (vendor_id, name, price, unit, stock, is_active) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const [result] = await connectDB.execute(query, [
    data.vendor_id,
    data.name,
    data.price,
    data.unit,
    data.stock,
    data.is_active ?? 1,
  ]);
  return result;
};

/* GET ALL PRODUCTS */
export const getAllProducts = async () => {
  const connectDB = await db();
  const query = `SELECT * FROM products ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query);
  return rows;
};

/* GET PRODUCT BY ID */
export const getProductById = async (id) => {
  const connectDB = await db();
  const query = `SELECT * FROM products WHERE id = ?`;
  const [rows] = await connectDB.execute(query, [id]);
  return rows[0];
};

/* GET PRODUCTS BY VENDOR ID */
export const getProductsByVendorId = async (vendor_id) => {
  const connectDB = await db();
  const query = `SELECT * FROM products WHERE vendor_id = ? ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query, [vendor_id]);
  return rows;
};

/* UPDATE PRODUCT */
export const updateProduct = async (id, data) => {
  const connectDB = await db();
  const query = `
    UPDATE products
    SET vendor_id = ?, name = ?, price = ?, unit = ?, stock = ?, is_active = ?
    WHERE id = ?
  `;
  const [result] = await connectDB.execute(query, [
    data.vendor_id,
    data.name,
    data.price,
    data.unit,
    data.stock,
    data.is_active,
    id,
  ]);
  return result;
};

/* DELETE PRODUCT */
export const deleteProduct = async (id) => {
  const connectDB = await db();
  const query = `DELETE FROM products WHERE id = ?`;
  const [result] = await connectDB.execute(query, [id]);
  return result;
};

/*UPDATE STOCK ONLY */
export const updateProductStock = async (id, stock) => {
  const connectDB = await db();
  const query = `UPDATE products SET stock = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [stock, id]);
  return result;
};

/*TOGGLE ACTIVE STATUS */
export const toggleProductStatus = async (id, status) => {
  const connectDB = await db();
  const query = `UPDATE products SET is_active = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [status, id]);
  return result;
};
