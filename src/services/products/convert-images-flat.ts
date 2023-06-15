import fileUpload, { FileArray } from 'express-fileupload';

export const convertImagesFlat = (
  images: FileArray
): fileUpload.UploadedFile[] => {
  const output = [];

  if (Array.isArray(images.mainPhoto)) {
    output.push(...images.mainPhoto);
  } else {
    output.push(images.mainPhoto);
  }

  if (Array.isArray(images.additionalPhotos)) {
    output.push(...images.additionalPhotos);
  } else {
    output.push(images.additionalPhotos);
  }

  return output;
};
