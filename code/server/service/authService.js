import { hashPassword } from "../helpers/authHelper.js";
import * as userRepository from "../repository/userRepository.js";
export const registerUser = async (data) => {
  data.password = await hashPassword(data.password);
  console.log("hashed password:", data.password);
  return await userRepository.createUser(data);
};

export const getUserById = async (id) => {
  return await userRepository.getUserById(id);
};

export const getUserByEmail = async (email) => {
  return await userRepository.getUserByEmail(email);
};
