"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertImagesFlat = void 0;
const convertImagesFlat = (images) => {
    const output = [];
    if (Array.isArray(images.mainPhoto)) {
        output.push(...images.mainPhoto);
    }
    else {
        output.push(images.mainPhoto);
    }
    if (Array.isArray(images.additionalPhotos)) {
        output.push(...images.additionalPhotos);
    }
    else {
        output.push(images.additionalPhotos);
    }
    return output;
};
exports.convertImagesFlat = convertImagesFlat;
