import JWT from "jsonwebtoken";
import { comparePassword } from "../helpers/authHelper.js";
import { sendOtpEmail } from "../helpers/emailHelper.js";
import {
  compareOTP,
  otpExpiryTime,
  otpGenerator,
} from "../helpers/otpHelper.js";
import * as userService from "../service/userService.js";

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
    const existingUser = await userService.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const result = await userService.registerUser(data);
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
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password_hash);
    console.log("Password validation result:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password or Email invalid" });
    }
    const token = JWT.sign(
      { id: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful",
      user: { ...user },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Generate OTP
    const { otp, hashedOtp } = await otpGenerator();
    const expiry = otpExpiryTime();

    console.log("Generated OTP:", otp);
    // Store hashed OTP
    const stored = await userService.storeOtp(email, hashedOtp, expiry);
    if (!stored) {
      return res.status(500).json({ message: "Failed to store OTP" });
    }

    // Send plain OTP
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, OTP and new password are required" });
    }

    const user = await userService.getUserByEmail(email);

    console.log("User found for password reset:", user);
    const isOtpValid = await compareOTP(otp, user.reset_otp);
    console.log("OTP comparison result:", isOtpValid);
    if (!user || !isOtpValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date(user.reset_otp_expiry) < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    console.log("Updating password for user ID:", user.id);
    const updatePasswordResult = await userService.updatePassword(
      user.id,
      newPassword,
    );

    if (!updatePasswordResult) {
      return res.status(500).json({ message: "Failed to update password" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reset failed" });
  }
};
