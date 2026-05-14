import * as subscriptionRepo from "../repository/subscriptionRepository.js";

export const createSubscription = async (data) => {
  return subscriptionRepo.createSubscription(data);
};

export const getAllSubscriptions = async () => {
  return subscriptionRepo.getAllSubscriptions();
};

export const getSubscriptionById = async (id) => {
  return subscriptionRepo.getSubscriptionById(id);
};

export const getSubscriptionsByUserId = async (userId) => {
  return subscriptionRepo.getSubscriptionsByUserId(userId);
};

export const getSubscriptionsByVendorId = async (vendorId) => {
  return subscriptionRepo.getSubscriptionsByVendorId(vendorId);
};

export const updateSubscription = async (id, data) => {
  return subscriptionRepo.updateSubscription(id, data);
};

export const updateSubscriptionStatus = async (id, status) => {
  return subscriptionRepo.updateSubscriptionStatus(id, status);
};

export const deleteSubscription = async (id) => {
  return subscriptionRepo.deleteSubscription(id);
};
