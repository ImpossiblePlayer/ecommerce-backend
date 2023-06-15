"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFiles = void 0;
const _services_1 = require("../services");
const UploadFiles = (req, res, next) => {
    const files = req.files;
    if (files) {
        next();
    }
    return (0, _services_1.BadRequest_400)(res, { message: 'images not found' });
};
exports.UploadFiles = UploadFiles;
