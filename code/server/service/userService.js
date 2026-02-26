import { hashPassword } from "../helpers/authHelper.js";
import * as userRepository from "../repository/userRepository.js";
export const registerUser = async (data) => {
  data.password = await hashPassword(data.password);
  console.log("hashed password:", data.password);
  return userRepository.createUser(data);
};

export const getUserById = async (id) => {
  return userRepository.getUserById(id);
};

export const getUserByEmail = async (email) => {
  return userRepository.getUserByEmail(email);
};

export const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await hashPassword(data.password);
    console.log("hashed password for update:", data.password);
  }

  return userRepository.updateUser(id, data);
};

export const getAllUsers = async () => {
  return userRepository.getAllUsers();
};

export const deleteUser = async (id) => {
  return userRepository.deleteUser(id);
};

export const storeOtp = async (email, otp, expiry) => {
  return userRepository.storeOtp(email, otp, expiry);
};

export const updatePassword = async (id, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  return userRepository.updatePassword(id, hashedPassword);
};
