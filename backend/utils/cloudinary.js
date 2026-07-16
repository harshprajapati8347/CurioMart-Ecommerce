const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Safely delete a local temp file, ignoring errors if it's already gone.
 */
const safeUnlink = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to remove temp file:", filePath, err.message);
    }
  });
};

/**
 * Uploads a local file to Cloudinary with automatic retries.
 * Only deletes the local temp file once the upload has either
 * succeeded or exhausted all retry attempts — this is what allows
 * the server to retry on transient failures without the user
 * needing to re-upload.
 */
const uploadOnCloudinary = async (localFilePath, options = {}) => {
  const { folder = "curiomart-server/products", maxRetries = 3 } = options;

  if (!localFilePath || !fs.existsSync(localFilePath)) return null;

  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder, // keeps all product images in one Cloudinary subfolder
      });

      safeUnlink(localFilePath);
      return response;
    } catch (error) {
      lastError = error;
      console.error(
        `Cloudinary upload attempt ${attempt}/${maxRetries} failed for ${localFilePath}:`,
        error.message
      );

      if (attempt < maxRetries) {
        // small backoff before retrying: 500ms, 1000ms, ...
        await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
      }
    }
  }

  // All retries exhausted — clean up and give up
  console.error(
    `Cloudinary upload permanently failed for ${localFilePath}:`,
    lastError?.message
  );
  safeUnlink(localFilePath);
  return null;
};

/**
 * Deletes an image from Cloudinary by public_id.
 * Used for rollback on failed product creation, or when a seller
 * deletes/replaces a product image later.
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete from Cloudinary:", publicId, error.message);
    return null;
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
