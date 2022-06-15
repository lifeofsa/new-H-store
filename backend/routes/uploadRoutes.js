import path from 'path';
import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';
import dotenv from 'dotenv';
import { admin, protect } from '../Middleware/authMiddleware.js';

dotenv.config();
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), protect, admin, async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  res.send(result);
});

export default router;
