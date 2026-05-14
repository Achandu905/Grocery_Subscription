import * as orderRepo from "../repository/orderRepository.js";
export const createOrder=async (data) => {
    const createOrder= orderRepo.createOrder(data);
    if(createOrder) {
        for (const item of data.products) {
            const product = await orderRepo.getProductById(item.product_id);
            if (!product) {
                throw new Error("Product not found");
            }
            
        }
        await orderRepo.addOrderItems(createOrder.insertId, data.products);
    }
        orderRepo.addOrderItems(createOrder.insertId, data.products);
};

export const getAllOrders=async () => {
    return orderRepo.getAllOrders();
};

export const getOrderById=async (id) => {
    return orderRepo.getOrderById(id);
};

export const getOrdersByUserId=async (userId) => {
    return orderRepo.getOrdersByUserId(userId);
};  

export const updateOrderStatus=async (id, status) => {
    return orderRepo.updateOrderStatus(id, status);
};  