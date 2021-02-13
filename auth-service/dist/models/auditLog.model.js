"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var logTypes_enum_1 = require("../types/logTypes.enum");
var mongoose_1 = __importDefault(require("mongoose"));
var AuditLogName = "AuditLog";
var auditLogSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: user_model_1.UserSchemaName
    },
    logType: {
        type: logTypes_enum_1.LogTypes,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        required: true,
        default: new Date()
    }
});
exports.default = mongoose_1.default.model(AuditLogName, auditLogSchema);
