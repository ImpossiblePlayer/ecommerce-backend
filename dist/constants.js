"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.JWT_ACCESS_TOKEN_LIFETIME = exports.JWT_REFRESH_TOKEN_LIFETIME = exports.JWT_ACCESS_SECRET_KEY = exports.JWT_REFRESH_SECRET_KEY = exports.MONGODB_URI = exports.HTTP_STATUSE_CODES = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var HTTP_STATUSE_CODES;
(function (HTTP_STATUSE_CODES) {
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["OK_200"] = 200] = "OK_200";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["CREATED_201"] = 201] = "CREATED_201";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["NO_CONTENT_204"] = 204] = "NO_CONTENT_204";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["BAD_REQUEST_400"] = 400] = "BAD_REQUEST_400";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["UNAUTHORIZED_401"] = 401] = "UNAUTHORIZED_401";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["FORBIDDEN_403"] = 403] = "FORBIDDEN_403";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["NOT_FOUND_404"] = 404] = "NOT_FOUND_404";
    HTTP_STATUSE_CODES[HTTP_STATUSE_CODES["ITERNAL_ERROR_500"] = 500] = "ITERNAL_ERROR_500";
})(HTTP_STATUSE_CODES = exports.HTTP_STATUSE_CODES || (exports.HTTP_STATUSE_CODES = {}));
_a = process.env, exports.MONGODB_URI = _a.MONGODB_URI, exports.JWT_REFRESH_SECRET_KEY = _a.JWT_REFRESH_SECRET_KEY, exports.JWT_ACCESS_SECRET_KEY = _a.JWT_ACCESS_SECRET_KEY, exports.JWT_REFRESH_TOKEN_LIFETIME = _a.JWT_REFRESH_TOKEN_LIFETIME, exports.JWT_ACCESS_TOKEN_LIFETIME = _a.JWT_ACCESS_TOKEN_LIFETIME;
exports.CLIENT_URL = process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : process.env.DEV_URL;
