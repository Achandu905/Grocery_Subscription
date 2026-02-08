import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/authHelper.js";
import * as authService from "../service/userService.js";

export const registerUser = async (req, res) => {
  const data = req.body;
  try {
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.phone ||
      !data.address ||
      !data.pincode ||
      !data.role_id
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingUser = await authService.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const result = await authService.registerUser(data);
    if (result) {
      res.status(201).json({
        message: "User registered successfully!",
        userId: result.insertId,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password or Email invalid" });
    }
    const token = JWT.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    console.log("Generated JWT token:", token);
    res.status(200).json({
      message: "Login successful",
      user: { ...user },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
