import catchAsync from '../utils/catchAsync.js';
import ApiError from '../utils/apiError.js';
import httpStatus from 'http-status';
import { admin } from '../configs/firebase.config.js';

const uploadFiles = catchAsync(async (req, res, next) => {

  const bucket = admin.storage().bucket();
  const uploadPromises = req.files.map((file) => {
    const folder = file.mimetype.startsWith('image') ? 'images' : 'videos';
    const blob = bucket.file(`QuanLyKhoHang/${folder}/${Date.now()}_${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        reject(error);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket.name)}/o/${encodeURIComponent(blob.name)}?alt=media`;
        resolve(publicUrl);
      })

      blobStream.end(file.buffer);
    });
  });

  const fileUrls = await Promise.all(uploadPromises);

  try {
    req.body.fileUrls = fileUrls;
    next();
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }


});

export default uploadFiles;
