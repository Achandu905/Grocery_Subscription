import express from "express";
import {
    deleteUser,
    getAllUsers,
    updateUser,
} from "../controllers/userController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Update user
router.put("/:id", requireSignIn, updateUser);

// Get all users
router.get("/", requireSignIn, getAllUsers);

// Delete user
router.delete("/:id", requireSignIn, deleteUser);
export default router;
