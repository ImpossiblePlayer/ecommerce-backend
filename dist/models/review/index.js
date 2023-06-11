"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerReview = exports.ProductReview = exports.SellerReviewSchema = exports.ProductReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    rating: Number,
    likes: Number,
    dislikes: Number,
    date: { type: Date, default: Date.now, required: true },
});
exports.ProductReviewSchema = new mongoose_1.Schema({
    ...ReviewSchema.obj,
    text: {
        type: {
            advantages: { type: String, default: '', trim: true },
            disadvantages: { type: String, default: '', trim: true },
            comment: { type: String, default: '', trim: true },
        },
        required: true,
    },
    image: [mongoose_1.Schema.Types.UUID],
});
exports.SellerReviewSchema = new mongoose_1.Schema({
    ...ReviewSchema.obj,
    text: { type: String, required: true },
});
exports.ProductReview = (0, mongoose_1.model)('ProductReview', exports.ProductReviewSchema);
exports.SellerReview = (0, mongoose_1.model)('SellerReview', exports.SellerReviewSchema);
