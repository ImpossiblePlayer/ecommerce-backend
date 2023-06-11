"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindToken = exports.ValidateRefreshToken = exports.ValidateAccessToken = exports.RemoveToken = exports.SaveToken = exports.GenerateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _models_1 = require("../../models");
const constants_1 = require("../../constants");
const GenerateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, constants_1.JWT_ACCESS_SECRET_KEY, {
        expiresIn: constants_1.JWT_ACCESS_TOKEN_LIFETIME,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, constants_1.JWT_REFRESH_SECRET_KEY, {
        expiresIn: constants_1.JWT_REFRESH_TOKEN_LIFETIME,
    });
    return [accessToken, refreshToken];
};
exports.GenerateTokens = GenerateTokens;
const SaveToken = async (userId, refreshToken) => {
    const user = await _models_1.Customer.findById(userId);
    if (user) {
        user.refreshTokens.push(refreshToken);
        return user.save();
    }
    return;
};
exports.SaveToken = SaveToken;
const RemoveToken = async (refreshToken) => {
    const user = await _models_1.Customer.findOne({ refreshToken });
    if (!user || !user.refreshTokens)
        return null;
};
exports.RemoveToken = RemoveToken;
const ValidateAccessToken = async (token) => {
    try {
        const userData = jsonwebtoken_1.default.verify(token, constants_1.JWT_ACCESS_SECRET_KEY);
        return userData;
    }
    catch (err) {
        return;
    }
};
exports.ValidateAccessToken = ValidateAccessToken;
const ValidateRefreshToken = async (token) => {
    try {
        const userData = jsonwebtoken_1.default.verify(token, constants_1.JWT_REFRESH_SECRET_KEY);
        return userData;
    }
    catch (err) {
        return null;
    }
};
exports.ValidateRefreshToken = ValidateRefreshToken;
const FindToken = async (refreshToken) => {
    const user = await _models_1.Customer.findOne({ refreshToken });
    return user ? true : false;
};
exports.FindToken = FindToken;
