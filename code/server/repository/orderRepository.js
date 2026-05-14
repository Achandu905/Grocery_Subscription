import db from "../config/db.js";

export const createOrder = async (data) => {
  const connectDB = await db();
  const query = `   INSERT INTO orders (user_id, product_id, quantity, total_price, status)
    VALUES (?, ?, ?, ?, ?)`;
  const [result] = await connectDB.execute(query, [
    data.user_id,
    data.product_id,
    data.quantity,
    data.total_price,
    data.status
  ]);
  return result;
};  

export const getAllOrders = async () => {
  const connectDB = await db();
  const query = `SELECT * FROM orders ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query);
  return rows;
};

export const getOrderById = async (id) => {
  const connectDB = await db();
  const query = `SELECT * FROM orders WHERE id = ?`;
  const [rows] = await connectDB.execute(query, [id]);
  return rows[0];
};

export const getOrdersByUserId = async (userId) => {
  const connectDB = await db();
  const query = `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query, [userId]);
  return rows;
}

export const updateOrderStatus = async (id, status) => {
  const connectDB = await db();
  const query = `UPDATE orders SET status = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [status, id]);
  return result;
}
    