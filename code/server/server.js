
import dotenv from "dotenv";
dotenv.config();

import "./config/cloudinary.js";


import cors from "cors";
import express from "express";
import morgan from "morgan";



import apartmentRoutes from "./routes/apartmentsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import oderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import userRoutes from "./routes/userRoutes.js";



const app = express();
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/apartments", apartmentRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", oderRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
