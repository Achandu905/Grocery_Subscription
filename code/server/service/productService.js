import * as productsRepository from "../repository/productRepository.js";

export const createProduct = async (data) => {
  return productsRepository.addProduct(data);
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
