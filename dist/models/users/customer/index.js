"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = require("mongoose");
const _models_1 = require("../..");
const CustomerSchema = new _models_1.UserSchema({
    profilePic: {
        type: String,
        default: '/src/shared/assets/userPics/default.png',
    },
    address: {
        country: String,
        city: String,
        street: String,
        house: String,
        postalCode: String,
    },
    socialMedia: {
        instagram: String,
        facebook: String,
        twitter: String,
    },
}, {
    query: {
        getData: async function () {
            return {
                name: this.name,
                profilePic: this.profilePics,
                socialMedia: this.socialMedia,
            };
        },
    },
});
exports.Customer = (0, mongoose_1.model)('User', CustomerSchema);
