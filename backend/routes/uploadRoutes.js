import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { uploadProductImage } from '../controllers/uploadController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png|gif|webp/;
  const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (ext && mimeType) {
    return cb(null, true);
  } else {
    return cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

router
  .route('/')
  .post(protect, isAdmin, upload.single('image'), uploadProductImage);

export default router;
