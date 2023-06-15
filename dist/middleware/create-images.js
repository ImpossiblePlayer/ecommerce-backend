"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImages = void 0;
const fs_1 = __importDefault(require("fs"));
const process = __importStar(require("process"));
const mongoose_1 = __importDefault(require("mongoose"));
const _services_1 = require("../services");
const CreateImages = (req, res, next) => {
    const productId = new mongoose_1.default.Types.ObjectId();
    const flattedArrayPhotos = (0, _services_1.convertImagesFlat)(req.files);
    const path = `images/products/${productId.toString()}`;
    if (fs_1.default.existsSync(path)) {
        fs_1.default.mkdirSync(path);
    }
    flattedArrayPhotos.forEach((photo) => {
        photo.mv(`${path}/${photo.name}`);
    });
    const mainPhotoPath = `${process.env.SERVER_URL}/${path}/${flattedArrayPhotos[0].name}`;
    const additionalPhotosPaths = flattedArrayPhotos
        .slice(1)
        .map((photo) => `${process.env.SERVER_URL}/src/${path}/${photo.name}`);
    req.body.productId = productId.toString();
    req.body.mainPhoto = { url: mainPhotoPath, thumbUrl: mainPhotoPath };
    req.body.additionalPhotos = additionalPhotosPaths;
    return next();
};
exports.CreateImages = CreateImages;
