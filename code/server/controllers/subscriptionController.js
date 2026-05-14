import * as subscriptionService from "../service/subscriptionService.js";

export const createSubscriptionController = async (req, res) => {
  try {
    const { vendor_id, start_date, end_date, frequency, status } = req.body;
    if (!vendor_id || !start_date || !end_date || !frequency) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const subscriptionData = {
      user_id: req.user?.id ?? null,
      vendor_id,
      start_date,
      end_date,
      frequency,
      status: status || "ACTIVE",
    };

    const result = await subscriptionService.createSubscription(subscriptionData);

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription: { id: result.insertId, ...subscriptionData },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create subscription", error: error.message });
  }
};

export const getAllSubscriptionsController = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscriptions", error: error.message });
  }
};

export const getSubscriptionByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Missing required field: id" });
    }

    const subscription = await subscriptionService.getSubscriptionById(id);
    res.status(200).json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscription", error: error.message });
  }
};

export const getSubscriptionsByUserIdController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing required field: userId" });
    }

    const subscriptions = await subscriptionService.getSubscriptionsByUserId(userId);
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscriptions", error: error.message });
  }
};

export const getSubscriptionsByVendorIdController = async (req, res) => {
  try {
    const { vendorId } = req.params;
    if (!vendorId) {
      return res.status(400).json({ success: false, message: "Missing required field: vendorId" });
    }

    const subscriptions = await subscriptionService.getSubscriptionsByVendorId(vendorId);
    res.status(200).json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscriptions", error: error.message });
  }
};

export const updateSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Missing required field: id" });
    }

    const result = await subscriptionService.updateSubscription(id, updateData);
    res.status(200).json({ success: true, message: "Subscription updated successfully", result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update subscription", error: error.message });
  }
};

export const updateSubscriptionStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: "Missing required fields: id or status" });
    }

    const result = await subscriptionService.updateSubscriptionStatus(id, status);
    res.status(200).json({ success: true, message: "Subscription status updated successfully", result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update subscription status", error: error.message });
  }
};

export const deleteSubscriptionController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Missing required field: id" });
    }

    const result = await subscriptionService.deleteSubscription(id);
    res.status(200).json({ success: true, message: "Subscription deleted successfully", result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete subscription", error: error.message });
  }
};
