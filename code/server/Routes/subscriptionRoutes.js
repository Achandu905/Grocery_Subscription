import express from "express";
import {
    createSubscriptionController,
    deleteSubscriptionController,
    getAllSubscriptionsController,
    getSubscriptionByIdController,
    getSubscriptionsByUserIdController,
    getSubscriptionsByVendorIdController,
    updateSubscriptionController,
    updateSubscriptionStatusController,
} from "../controllers/subscriptionController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", requireSignIn, createSubscriptionController);
router.get("/", requireSignIn, getAllSubscriptionsController);
router.get("/:id", requireSignIn, getSubscriptionByIdController);
router.get("/user/:userId", requireSignIn, getSubscriptionsByUserIdController);
router.get("/vendor/:vendorId", requireSignIn, getSubscriptionsByVendorIdController);
router.put("/:id", requireSignIn, updateSubscriptionController);
router.put("/:id/status", requireSignIn, updateSubscriptionStatusController);
router.delete("/:id", requireSignIn, deleteSubscriptionController);

export default router;
