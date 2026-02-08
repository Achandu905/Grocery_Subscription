import express from "express";
import {
    createApartmentController,
    deleteApartmentController,
    getAllApartmentsController,
    getApartmentByIdController,
    updateApartmentController,
} from "../controllers/apartmentsController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Create apartment
router.post("/", requireSignIn, createApartmentController);

// Update apartment
router.put("/:id", requireSignIn, updateApartmentController);

// Get all apartments
router.get("/", requireSignIn, getAllApartmentsController);

// Get apartment by ID
router.get("/:id", requireSignIn, getApartmentByIdController);

// Delete apartment
router.delete("/:id", requireSignIn, deleteApartmentController);
export default router;
