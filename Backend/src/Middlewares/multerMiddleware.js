import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the upload directory exists
const uploadDir = "/public";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Ensure directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

// File filter to allow only image formats
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, JPG, PNG, GIF) are allowed!"), false);
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export { upload };
