"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = exports.Authorize = void 0;
const _models_1 = require("../../models");
const services_1 = require("../../services");
const Authorize = async (req, res) => {
    try {
        const { email, password } = req.body;
        email.trim();
        if (!email || !password) {
            return (0, services_1.BadRequest_400)(res, {
                message: 'email or/and password fields are empty',
            });
        }
        const user = await _models_1.Customer.findOne({ email: email });
        if (!user) {
            return (0, services_1.BadRequest_400)(res, {
                message: 'email or/and password fields are incorrect',
            });
        }
        const isCorrectPassword = await user.comparePassword(password);
        if (!isCorrectPassword)
            return (0, services_1.BadRequest_400)(res, { message: 'incorrect password' });
        const [accessToken, refreshToken] = await user.generateTokens();
        return (0, services_1.OK_200)(res, {
            message: 'successfully authorized',
            accessToken,
        }).cookie('refreshToken', refreshToken);
    }
    catch (err) {
        return (0, services_1.InternalError_500)(res);
    }
};
exports.Authorize = Authorize;
const Authenticate = async (req, res) => {
    try {
        console.log();
    }
    catch (err) {
        return (0, services_1.InternalError_500)(res);
    }
};
exports.Authenticate = Authenticate;
