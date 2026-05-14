import * as orderService from "../service/orderService.js";
export const createOrderController = async (req, res) => {
  try {
    if ( !req.body.total_amount || !req.body.vendor_id || !req.body.status || !req.body.order_type || !req.body.products) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    req.body.user_id = req.user.id;
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, message: "Order created successfully", order });

  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const getOrderByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Missing required field: id" });
        }
        const order = await orderService.getOrderById(id);
        res.status(200).json({ success: true, order: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch order" });
    }   
};

export const getOrdersByUserIdController = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing required field: userId" });
        }
        const orders = await orderService.getOrdersByUserId(userId);
        res.status(200).json({ success: true, orders: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

export const updateOrderStatusController = async (req, res) => {
    try {
        const { id } = req.params;  
        const { status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Missing required fields: id or status" });
        }
        const updatedOrder = await orderService.updateOrderStatus(id, status);
        res.status(200).json({ success: true, message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update order status" });
    }   
};
