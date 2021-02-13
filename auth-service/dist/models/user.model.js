"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchemaName = "Users";
var userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model(exports.UserSchemaName, userSchema);
