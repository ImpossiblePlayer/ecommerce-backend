"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = exports.DeleteAccount = exports.Authorize = exports.RegisterAccount = void 0;
const _models_1 = require("../../models");
const _services_1 = require("../../services");
const RegisterAccount = async (req, res) => {
    try {
        const name = req.body.name.trim();
        const email = req.body.email.trim();
        const password = req.body.password;
        if (!name || !email || !password) {
            return (0, _services_1.BadRequest_400)(res, {
                message: `'name', 'email', or/and 'password' fields are empty`,
            });
        }
        if (!/\S+@\S+\.\S+/.test(email) || !/^[a-zA-Z0-9]+$/.test(name)) {
            return (0, _services_1.BadRequest_400)(res, {
                message: `fields 'name' or 'email' contain invalid values`,
            });
        }
        const candidate = await _models_1.Customer.findOne({ email });
        if (candidate) {
            return (0, _services_1.BadRequest_400)(res, { message: 'user already exists' });
        }
        const doc = new _models_1.Customer({ name, email });
        await doc.save();
        return (0, _services_1.OK_200)(res, { message: 'successfully registered account' });
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.RegisterAccount = RegisterAccount;
const Authorize = async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password;
        if (!email || !password) {
            return (0, _services_1.BadRequest_400)(res, {
                message: 'email or/and password fields are empty',
            });
        }
        const user = await _models_1.Customer.findOne({ email: email });
        if (!user) {
            return (0, _services_1.BadRequest_400)(res, {
                message: 'email or/and password fields are incorrect',
            });
        }
        const isCorrectPassword = await user.comparePassword(password);
        if (!isCorrectPassword)
            return (0, _services_1.BadRequest_400)(res, { message: 'incorrect password' });
        const [accessToken, refreshToken] = await user.generateTokens();
        return (0, _services_1.OK_200)(res, {
            message: 'successfully authorized',
            accessToken,
        }).cookie('refreshToken', refreshToken);
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.Authorize = Authorize;
const DeleteAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (0, _services_1.BadRequest_400)(res, {
                message: `both fields 'email' and 'password' are required`,
            });
        }
        const user = await _models_1.Customer.findOne({ email });
        if (!user)
            return (0, _services_1.BadRequest_400)(res, { message: 'user not found' });
        const isCorrectPassword = await user.comparePassword(password);
        if (!isCorrectPassword)
            return (0, _services_1.BadRequest_400)(res, { message: '' });
        _models_1.Customer.deleteOne({ email });
        return (0, _services_1.OK_200)(res, { message: 'successfully deleted user' });
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.DeleteAccount = DeleteAccount;
const Authenticate = async (req, res) => {
    try {
        console.log();
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.Authenticate = Authenticate;
