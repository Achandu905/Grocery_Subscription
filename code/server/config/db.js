import mysql from "mysql2/promise";

let pool = null;

const connectDB = async () => {
  if (pool) {
    return pool;
  }

  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
      maxIdle: Number(process.env.DB_MAX_IDLE || 10),
      idleTimeout: Number(process.env.DB_IDLE_TIMEOUT || 60000),
      queueLimit: Number(process.env.DB_QUEUE_LIMIT || 0),
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    await pool.query("SELECT 1");
    console.log(" MySQL pool connected successfully");
    return pool;
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
