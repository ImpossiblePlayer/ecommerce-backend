"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = exports.SellerSchema = void 0;
const mongoose_1 = require("mongoose");
const _models_1 = require("../..");
const SellerDeliverySchema = new mongoose_1.Schema({
    cost: Number,
    regions: [String],
});
exports.SellerSchema = new mongoose_1.Schema({
    supplierCompany: { type: String, trim: true },
    isVerified: Boolean,
    isWorldwideShipping: Boolean,
    description: String,
    delivery: SellerDeliverySchema,
    paymentMethods: { type: [String], trim: true },
    returnPolicy: { type: String, trim: true },
    categories: { type: [String], trim: true },
    brands: { type: [String], trim: true },
    rating: Number,
    reviews: { type: [_models_1.SellerReviewSchema], ref: 'SellerReview' },
});
exports.Seller = (0, mongoose_1.model)('Seller', exports.SellerSchema);
