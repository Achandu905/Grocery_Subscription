import { uploadImageToCloudinary } from "../config/cloudinary.js";

const MAX_IMAGE_FIELD_SIZE = 10 * 1024 * 1024;

const isValidImageInput = (image) => {
  return typeof image === "string" && image.trim().length > 0;
};

const isLikelyImageSource = (image) => {
  return (
    image.startsWith("data:image/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  );
};

export const attachProductImageUrl = async (req, res, next) => {
  try {
    const image = req.body?.image;

    if (!isValidImageInput(image)) {
      return next();
    }

    if (image.length > MAX_IMAGE_FIELD_SIZE) {
      return res.status(413).json({
        message: "Image payload too large",
        success: false,
      });
    }

    if (!isLikelyImageSource(image)) {
      return res.status(400).json({
        message:
          "Invalid image format. Provide a data URL or an http/https image URL",
        success: false,
      });
    }

    const uploadResult = await uploadImageToCloudinary(image);

    if (!uploadResult?.secure_url) {
      return res.status(502).json({
        message: "Image upload service returned an invalid response",
        success: false,
      });
    }

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
