import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import authRoutes from "./Routes/authRoutes.js";

const app = express();
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Api
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
