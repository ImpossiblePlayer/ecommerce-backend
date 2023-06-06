"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
const _models_1 = require("../..");
exports.AdminSchema = new _models_1.UserSchema({
    admin: Boolean,
}, {});
exports.Admin = (0, mongoose_1.model)('Admin', exports.AdminSchema);
