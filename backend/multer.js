const multer = require("multer");
const path = require("path");
const fs = require("fs");

const tempDir = path.join(__dirname, "..", "public", "temp");

// Ensure temp folder exists (won't exist on fresh clone/deploy since it's usually gitignored)
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-")
      .toLowerCase();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${filename}-${uniqueSuffix}${ext}`);
  },
});

// Only allow real image mimetypes — don't trust extensions alone
const fileFilter = (req, file, cb) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, png, webp, gif) are allowed"), false);
  }
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
    files: 6, // max 6 images per product, adjust as needed
  },
});
