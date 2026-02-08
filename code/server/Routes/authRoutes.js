import express from "express";
import { loginUser, registerUser } from "../Controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Test route to verify authentication
router.get("/test", requireSignIn, (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});

export default router;
