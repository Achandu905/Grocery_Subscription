import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadImageToCloudinary = (buffer) => {
  console.log("Uploading image to Cloudinary...", cloudinary.config());
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
