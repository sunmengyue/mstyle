import asyncHandler from 'express-async-handler';
import { uploadFileToS3 } from '../s3.js';
import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

// @desc Upload a product photo
// @route POST/api/upload
// @access Private
const uploadProductImage = asyncHandler(async (req, res) => {
  const result = await uploadFileToS3(req.file);
  await unlinkFile(req.file.path);
  res.status(201).send(result.Location);
});

export { uploadProductImage };
