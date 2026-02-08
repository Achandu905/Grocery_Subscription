import express from "express";
import {
  forgotPasswordController,
  loginUser,
  registerUser,
  resetPasswordController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// Test route to verify authentication
router.get("/test", requireSignIn, (req, res) => {
  res.status(200).json({ message: "Test route is working!" });
});

export default router;
