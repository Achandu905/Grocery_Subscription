import db from "../config/db.js";

export const createSubscription = async (data) => {
  const connectDB = await db();
  const query = `INSERT INTO subscriptions (user_id, vendor_id, start_date, end_date, frequency, status) VALUES (?, ?, ?, ?, ?, ?)`;
  const [result] = await connectDB.execute(query, [
    data.user_id,
    data.vendor_id,
    data.start_date,
    data.end_date,
    data.frequency,
    data.status || "ACTIVE",
  ]);
  return result;
};

export const getSubscriptionById = async (id) => {
  const connectDB = await db();
  const query = `SELECT * FROM subscriptions WHERE id = ?`;
  const [rows] = await connectDB.execute(query, [id]);
  return rows[0];
};

export const getAllSubscriptions = async () => {
  const connectDB = await db();
  const query = `SELECT * FROM subscriptions ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query);
  return rows;
};

export const getSubscriptionsByUserId = async (userId) => {
  const connectDB = await db();
  const query = `SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query, [userId]);
  return rows;
};

export const getSubscriptionsByVendorId = async (vendorId) => {
  const connectDB = await db();
  const query = `SELECT * FROM subscriptions WHERE vendor_id = ? ORDER BY created_at DESC`;
  const [rows] = await connectDB.execute(query, [vendorId]);
  return rows;
};

export const updateSubscription = async (id, data) => {
  const connectDB = await db();
  const query = `UPDATE subscriptions SET
      user_id = COALESCE(?, user_id),
      vendor_id = COALESCE(?, vendor_id),
      start_date = COALESCE(?, start_date),
      end_date = COALESCE(?, end_date),
      frequency = COALESCE(?, frequency),
      status = COALESCE(?, status)
    WHERE id = ?`;

  const [result] = await connectDB.execute(query, [
    data.user_id,
    data.vendor_id,
    data.start_date,
    data.end_date,
    data.frequency,
    data.status,
    id,
  ]);
  return result;
};

export const updateSubscriptionStatus = async (id, status) => {
  const connectDB = await db();
  const query = `UPDATE subscriptions SET status = ? WHERE id = ?`;
  const [result] = await connectDB.execute(query, [status, id]);
  return result;
};

export const deleteSubscription = async (id) => {
  const connectDB = await db();
  const query = `DELETE FROM subscriptions WHERE id = ?`;
  const [result] = await connectDB.execute(query, [id]);
  return result;
};
