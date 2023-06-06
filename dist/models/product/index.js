"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const _models_1 = require("..");
const ProductPhotoSchema = new mongoose_1.Schema({
    url: { type: mongoose_1.Schema.Types.UUID, required: true },
    thumbUrl: { type: mongoose_1.Schema.Types.UUID, required: false },
});
const ProductSpecificationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true },
});
exports.ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    categories: { type: [String], required: true, trim: true },
    quantity: { type: Number, required: true },
    params: [ProductSpecificationSchema],
    mainPhoto: { type: ProductPhotoSchema, required: true },
    additionalPhotos: [ProductPhotoSchema],
    price: {
        type: {
            current: { type: Number, required: true },
            old: { type: Number, required: false },
        },
        required: true,
    },
    comments: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'ProductReview',
    },
    rating: { type: Number, required: true },
    soldQuantity: { type: Number, required: true },
    orders: { type: Number, required: true },
    specifications: [ProductSpecificationSchema],
    advantages: { type: [String], required: true },
    reviewsCount: { type: Number, required: true },
    reviews: { type: [_models_1.ProductReviewSchema], ref: 'ProductReview' },
    sellerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Seller', required: true },
}, {
    methods: {
        createProduct: async function (name, description, categories, quantity, photos, price) {
            this.name = name;
            this.description = description;
            this.categories = categories;
            this.quantity = quantity;
            this.mainPhoto = photos[0];
            this.additionalPhotos = photos;
            this.price = price;
        },
    },
    query: {
        updateProduct: async function (name, description, categories, quantity, photos, price) {
            if (name == this.name ||
                description == this.description ||
                categories == this.categories ||
                quantity == this.quantity ||
                price.current == this.price.current ||
                price.old == this.price.old ||
                photos == this.photos) {
                return false;
            }
            this.name = name;
            this.description = description;
            this.categories = categories;
            this.quantity = quantity;
            this.mainPhoto = photos[0];
            this.additionalPhotos = photos;
            this.price = price;
            return true;
        },
    },
});
exports.Product = (0, mongoose_1.model)('Product', exports.ProductSchema);
