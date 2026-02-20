import mysql from "mysql2/promise";

let connection = null;

const connectDB = async () => {
  try {
    if (connection) {
      return connection;
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    });

    console.log(" MySQL connected successfully");
    return connection;
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
