import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

let db;

// connect once at startup
const startServer = async () => {
  db = await connectDB();

  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// fetch existing table
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM temp_test1");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" + error });
  }
});

startServer();
