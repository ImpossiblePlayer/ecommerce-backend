"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError_500 = exports.NotFound_404 = exports.Forbidden_403 = exports.Unautorised_401 = exports.BadRequest_400 = exports.NoContent_204 = exports.Created_201 = exports.OK_200 = void 0;
const response = (res, status) => res.status(status);
const resWithJson = (res, status, json) => response(res, status).json(json);
const OK_200 = (res, json) => {
    return resWithJson(res, 200, json);
};
exports.OK_200 = OK_200;
const Created_201 = (res, json) => {
    return json ? resWithJson(res, 201, json) : response(res, 201);
};
exports.Created_201 = Created_201;
const NoContent_204 = res => {
    return response(res, 204);
};
exports.NoContent_204 = NoContent_204;
const BadRequest_400 = (res, json) => {
    return json ? resWithJson(res, 400, json) : response(res, 400);
};
exports.BadRequest_400 = BadRequest_400;
const Unautorised_401 = res => {
    return response(res, 401);
};
exports.Unautorised_401 = Unautorised_401;
const Forbidden_403 = (res, json) => {
    return json ? resWithJson(res, 403, json) : response(res, 403);
};
exports.Forbidden_403 = Forbidden_403;
const NotFound_404 = res => {
    return response(res, 404);
};
exports.NotFound_404 = NotFound_404;
const InternalError_500 = (res, json) => {
    return json ? resWithJson(res, 500, json) : response(res, 500);
};
exports.InternalError_500 = InternalError_500;
