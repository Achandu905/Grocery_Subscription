import { uploadImageToCloudinary } from "../config/cloudinary.js";

const isValidImageInput = (image) => {
  return typeof image === "string" && image.trim().length > 0;
};

export const attachProductImageUrl = async (req, res, next) => {
  try {
    const image = req.body.image;

    if (!isValidImageInput(image)) {
      return next();
    }

    const uploadResult = await uploadImageToCloudinary(image);

    req.body.image_url = uploadResult.secure_url;
    delete req.body.image;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload product image",
      success: false,
      error: error.message,
    });
  }
};
