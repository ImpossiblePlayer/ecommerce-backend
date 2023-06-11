"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("./constants");
mongoose_1.default.set('strictQuery', false);
class Database {
    static connect = async () => {
        await mongoose_1.default
            .connect(constants_1.MONGODB_URI)
            .then(() => {
            console.log('DB ok');
        })
            .catch((err) => {
            console.log(`DB error: ${err}`);
        });
    };
}
exports.Database = Database;
