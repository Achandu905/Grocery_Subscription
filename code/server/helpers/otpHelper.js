import bcrypt from "bcrypt";
export const otpGenerator = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await hashOTP(otp);
  return { otp, hashedOtp };
};

export const otpExpiryTime = () => {
  return new Date(Date.now() + 10 * 60 * 1000);
};

const hashOTP = async (otp) => {
  const saltRounds = 10;
  const hashedOtp = await bcrypt.hash(otp, saltRounds);
  return hashedOtp;
};

export const compareOTP = async (otp, hashedOtp) => {
  return await bcrypt.compare(otp, hashedOtp);
};
