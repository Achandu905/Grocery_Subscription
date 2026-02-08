import JWT from "jsonwebtoken";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.token, process.env.JWT_SECRET);
    console.log("Decoded token:", decode);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
