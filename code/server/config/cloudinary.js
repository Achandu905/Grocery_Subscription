import crypto from "crypto";

const REQUEST_TIMEOUT_MS = 15000;

const buildCloudinarySignature = (params, apiSecret) => {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${sortedParams}${apiSecret}`)
    .digest("hex");
};

const getCloudinaryConfig = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.CLOUDINARY_PRODUCTS_FOLDER || "products";

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing");
  }

  return { cloudName, apiKey, apiSecret, folder };
};

export const uploadImageToCloudinary = async (file) => {
  const { cloudName, apiKey, apiSecret, folder } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = buildCloudinarySignature({ folder, timestamp }, apiSecret);

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: form,
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Cloudinary upload failed: ${errorBody}`);
    }

    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Cloudinary upload request timed out");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
