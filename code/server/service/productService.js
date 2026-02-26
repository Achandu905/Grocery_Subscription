import * as productsRepository from "../repository/productRepository.js";

const createHttpError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const normalizeProductPayload = (data = {}) => {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const unit = typeof data.unit === "string" ? data.unit.trim() : "";
  const price = Number(data.price);
  const stock = Number(data.stock);
  const is_active =
    data.is_active === undefined || data.is_active === null
      ? 1
      : Number(data.is_active);

  if (!data.vendor_id) {
    throw createHttpError("Unauthorized vendor", 401);
  }

  if (!name || !unit) {
    throw createHttpError("Name and unit are required", 400);
  }

  if (!Number.isFinite(price) || price < 0) {
    throw createHttpError("Price must be a valid non-negative number", 400);
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw createHttpError("Stock must be a valid non-negative integer", 400);
  }

  if (![0, 1].includes(is_active)) {
    throw createHttpError("is_active must be either 0 or 1", 400);
  }

  if (data.image_url && typeof data.image_url !== "string") {
    throw createHttpError("image_url must be a string", 400);
  }

  return {
    ...data,
    vendor_id: data.vendor_id,
    name,
    unit,
    price,
    stock,
    is_active,
    image_url: data.image_url ?? null,
  };
};

const mapDatabaseError = (error) => {
  if (error?.code === "ER_NO_REFERENCED_ROW_2") {
    return createHttpError("Invalid vendor supplied", 400);
  }

  if (error?.code === "ER_DUP_ENTRY") {
    return createHttpError("Product already exists", 409);
  }

  return error;
};

export const createProduct = async (data) => {
  try {
    const payload = normalizeProductPayload(data);
    return await productsRepository.addProduct(payload);
  } catch (error) {
    throw mapDatabaseError(error);
  }
};

export const getAllProducts = async () => {
  return productsRepository.getAllProducts();
};

export const getProductById = async (id) => {
  return productsRepository.getProductById(id);
};

export const getProductsByVendorId = async (vendor_id) => {
  return productsRepository.getProductsByVendorId(vendor_id);
};

export const updateProduct = async (id, data) => {
  return productsRepository.updateProduct(id, data);
};

export const deleteProduct = async (id) => {
  return productsRepository.deleteProduct(id);
};

export const toggleProductStatus = async (id, is_active) => {
  return productsRepository.toggleProductStatus(id, is_active);
};

export const updateStock = async (id, stock) => {
  return productsRepository.updateProductStock(id, stock);
};
