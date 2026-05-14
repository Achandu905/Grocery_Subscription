import express from "express";
import {
    createOrderController,
    getAllOrdersController,
    getOrderByIdController,
    getOrdersByUserIdController,
    updateOrderStatusController,
} from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Create order
router.post("/", requireSignIn, createOrderController);

// Get all orders
router.get("/", requireSignIn, getAllOrdersController);

// Get order by ID
router.get("/:id", requireSignIn, getOrderByIdController);

// Get orders with user ID
router.get("/user/:userId", requireSignIn, getOrdersByUserIdController);

// Update order status
router.put("/:id/status", requireSignIn, updateOrderStatusController);

export default router;