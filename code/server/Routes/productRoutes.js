import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  getProductsByVendorIdController,
  toggleProductStatusController,
  updateProductController,
  updateStockController,
} from "../controllers/productController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
import { attachProductImageUrl } from "../middlewares/productImageUploadMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create product
router.post(
  "/",
  requireSignIn,
  upload.single("image"),
  attachProductImageUrl,
  createProductController,
);

// Update product
router.put(
  "/:id",
  requireSignIn,
  attachProductImageUrl,
  updateProductController,
);

// Get all products
router.get("/", requireSignIn, getAllProductsController);

// Get products by vendor ID
router.get("/vendor", requireSignIn, getProductsByVendorIdController);

// Get product by ID
router.get("/:id", requireSignIn, getProductByIdController);

// Delete product
router.delete("/:id", requireSignIn, deleteProductController);

// Update product stock
router.put("/:id/stock", requireSignIn, updateStockController);

// Toggle product status
router.put("/:id/status", requireSignIn, toggleProductStatusController);

export default router;
