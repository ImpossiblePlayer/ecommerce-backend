"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: false },
    subCategories: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Category',
        default: null,
    },
    parentCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    products: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Product', required: true },
    featured: { type: Boolean, required: false },
    deletedAt: { type: Date, default: null },
}, {
    query: {
        getSubCategories: async function () {
            return this.products;
        },
        addSubCategory: async function (id) {
            const isUniqueId = this.subCategories.find((c) => c.id === id);
            if (isUniqueId)
                return false;
            this.subCategories.push(id);
        },
    },
    timestamps: true,
});
CategorySchema.index({ deletedAt: 1 }, { expireAfterSeconds: 60 * 24 * 30 });
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
