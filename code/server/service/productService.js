import * as productsRepository from "../repository/productRepository.js";

export const createProduct = async (data) => {
  return await productsRepository.addProduct(data);
};

export const getAllProducts = async () => {
  return await productsRepository.getAllProducts();
};

export const getProductById = async (id) => {
  return await productsRepository.getProductById(id);
};

export const getProductsByVendorId = async (vendor_id) => {
  return await productsRepository.getProductsByVendorId(vendor_id);
};

export const updateProduct = async (id, data) => {
  return await productsRepository.updateProduct(id, data);
};

export const deleteProduct = async (id) => {
  return await productsRepository.deleteProduct(id);
};

export const toggleProductStatus = async (id, is_active) => {
  return await productsRepository.toggleProductStatus(id, is_active);
};

export const updateStock = async (id, stock) => {
  return await productsRepository.updateProductStock(id, stock);
};
