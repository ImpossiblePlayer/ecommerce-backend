"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMiddleware = exports.CustomerMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _models_1 = require("../models");
const _services_1 = require("../services");
const constants_1 = require("../constants");
const CheckAuth = (req, res, next, model) => {
    const token = req.cookies.authentication;
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, constants_1.JWT_REFRESH_SECRET_KEY);
            const { userId, email, isActivated } = decodedToken;
            const candidate = model.findOne({ _id: userId, email, isActivated });
            if (!candidate) {
                return (0, _services_1.BadRequest_400)(res, { message: 'wrong token' });
            }
            return next();
        }
        catch (err) {
            console.log(err);
            return (0, _services_1.Unautorised_401)(res, { message: 'not authorized' });
        }
    }
    return (0, _services_1.Unautorised_401)(res, { message: 'can not access' });
};
const CustomerMiddleware = (req, res, next) => CheckAuth(req, res, next, _models_1.Customer);
exports.CustomerMiddleware = CustomerMiddleware;
const AdminMiddleware = (req, res, next) => CheckAuth(req, res, next, _models_1.Admin);
exports.AdminMiddleware = AdminMiddleware;
