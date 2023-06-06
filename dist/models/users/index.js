"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
class UserSchema extends mongoose_1.Schema {
    constructor(obj, options) {
        super({
            ...obj,
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                lowercase: true,
                unique: true,
                required: true,
                trim: true,
            },
            hash: String,
            refreshTokens: [String],
            isActivated: { type: Boolean, default: true },
        }, {
            ...options,
            methods: {
                setPassword: async function (password) {
                    this.hash = await bcrypt_1.default.hash(password, 10);
                },
            },
            query: {
                comparePassword: async function (password) {
                    const hash = await bcrypt_1.default.hash(password, 10);
                    return await bcrypt_1.default.compare(password, hash);
                },
                compareRefreshToken: async function (token) {
                    const validTokens = this.refreshTokens.filter((refreshToken) => refreshToken === token);
                    return validTokens.length > 0;
                },
                generateTokens: async function () {
                    const payload = {
                        _id: this._id,
                        email: this.email,
                        isActivated: this.isActivated,
                    };
                    const accessToken = jsonwebtoken_1.default.sign(payload, constants_1.JWT_ACCESS_SECRET_KEY, {
                        expiresIn: constants_1.JWT_ACCESS_TOKEN_LIFETIME,
                    });
                    const refreshToken = jsonwebtoken_1.default.sign(payload, constants_1.JWT_REFRESH_SECRET_KEY, {
                        expiresIn: constants_1.JWT_REFRESH_TOKEN_LIFETIME,
                    });
                    this.refreshTokens.push(refreshToken);
                    return [accessToken, refreshToken];
                },
            },
        });
    }
}
exports.UserSchema = UserSchema;
