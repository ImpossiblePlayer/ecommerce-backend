"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = exports.CreateProduct = exports.GetProduct = void 0;
const _models_1 = require("../models");
const _services_1 = require("../services");
const GetProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await _models_1.Product.findById(productId);
        if (!product) {
            return (0, _services_1.NotFound_404)(res, {
                message: `there is no product with id '${productId}'`,
            });
        }
        const productData = product._doc;
        return (0, _services_1.OK_200)(res, { ...productData, id: product._id });
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.GetProduct = GetProduct;
const CreateProduct = async (req, res) => {
    try {
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.CreateProduct = CreateProduct;
const UpdateProduct = async (req, res) => (0, _services_1.OK_200)(res);
exports.UpdateProduct = UpdateProduct;