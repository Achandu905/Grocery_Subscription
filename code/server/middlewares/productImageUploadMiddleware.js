import { uploadImageToCloudinary } from "../service/cloudinaryService.js";

export const attachProductImageUrl = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }
    console.log(req.file.buffer);
    const uploadResult = await uploadImageToCloudinary(req.file.buffer);

    req.body.image_url = uploadResult.secure_url;

    next();
  } catch (error) {
    next(error);
  }
};
