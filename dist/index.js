"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const _routes_1 = require("./routes");
const constants_1 = require("./constants");
const database_1 = require("./database");
const port = process.env.PORT ?? 3000;
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)({ origin: constants_1.CLIENT_URL, credentials: true }))
    .use(body_parser_1.default.json())
    .use((0, express_fileupload_1.default)({}))
    .use((0, cookie_parser_1.default)())
    .use((0, morgan_1.default)(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
    ].join(' ');
}));
app
    .use('/user', _routes_1.UserRouter)
    .use('/product', _routes_1.ProductRouter)
    .use('/category', _routes_1.CategoryRouter);
database_1.Database.connect();
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
exports.default = app;
