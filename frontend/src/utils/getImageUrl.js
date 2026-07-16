/**
 * Resolves a display URL for an image field stored on a document.
 *
 * New records store images as Cloudinary `{ public_id, url }` objects, so this
 * simply returns `image.url`. A raw string is also accepted so any legacy or
 * already-absolute URL keeps working without changes.
 */
export const getImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.url || "";
};
