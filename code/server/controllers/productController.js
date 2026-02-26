import * as productService from "../service/productService.js";

/* CREATE PRODUCT */
export const createProductController = async (req, res, next) => {
  try {
    const { name, price, unit, stock, image_url } = req.body;

    if (!name || price === undefined || !unit || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const data = {
      name,
      price,
      unit,
      stock,
      image_url: image_url || null,
      vendor_id: req.user.id,
    };

    const result = await productService.createProduct(data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

/* GET ALL PRODUCTS */
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* GET PRODUCT BY ID */
export const getProductByIdController = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productService.getProductById(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* GET PRODUCTS BY VENDOR ID */
export const getProductsByVendorIdController = async (req, res) => {
  try {
    const vendor_id = req.user.id;
    const products = await productService.getProductsByVendorId(vendor_id);
    res.status(200).json({ products, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* UPDATE PRODUCT */
export const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    data.vendor_id = req.user.id;

    if (
      !data.vendor_id ||
      !data.name ||
      data.price === undefined ||
      !data.unit ||
      data.stock === undefined
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    const result = await productService.updateProduct(id, data);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

/* DELETE PRODUCT */
export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await productService.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product deleted successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const toggleProductStatusController = async (req, res) => {
  try {
    const id = req.params.id;
    const { is_active } = req.body;
    const result = await productService.toggleProductStatus(id, is_active);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    } else {
      res.status(200).json({
        message: "Product status updated successfully!",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updateStockController = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock } = req.body;
    const result = await productService.updateStock(id, stock);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    } else {
      res.status(200).json({
        message: "Product stock updated successfully!",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
