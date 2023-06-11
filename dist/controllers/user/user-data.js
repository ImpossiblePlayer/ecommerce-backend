"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserData = void 0;
const _models_1 = require("../../models");
const _services_1 = require("../../services");
const GetUserData = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await _models_1.Customer.findById(userId);
        if (!user) {
            return (0, _services_1.NotFound_404)(res);
        }
        const data = await user.getData();
        return (0, _services_1.OK_200)(res, { data });
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.GetUserData = GetUserData;
