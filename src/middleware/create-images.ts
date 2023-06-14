import fs from 'fs';
import * as process from 'process';

import { NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

import { convertImagesFlat } from '@services';

interface ReqWithImages extends Request {
  productId?: string;
  mainPhoto?: {
    url: string;
    thumbUrl: string;
  };
  additionalPhotos?: string[];
}

export const CreateImages = (
  req: ReqWithImages,
  res: Response,
  next: NextFunction
) => {
  const productId = new mongoose.Types.ObjectId();
  const flattedArrayPhotos = convertImagesFlat(req.files);

  const path = `images/products/${productId.toString()}`;

  if (fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  flattedArrayPhotos.forEach((photo: fileUpload.UploadedFile) => {
    photo.mv(`${path}/${photo.name}`);
  });

  const mainPhotoPath = `${process.env.SERVER_URL}/${path}/${flattedArrayPhotos[0].name}`;
  const additionalPhotosPaths = flattedArrayPhotos
    .slice(1)
    .map(
      (photo: fileUpload.UploadedFile) =>
        `${process.env.SERVER_URL}/src/${path}/${photo.name}`
    );

  req.body.productId = productId.toString();
  req.body.mainPhoto = { url: mainPhotoPath, thumbUrl: mainPhotoPath };
  req.body.additionalPhotos = additionalPhotosPaths;

  return next();
};
