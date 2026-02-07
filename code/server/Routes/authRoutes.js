import express from "express";
import { loginUser, registerUser } from "../Controllers/authController.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

export default router;
