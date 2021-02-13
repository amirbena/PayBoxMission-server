"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionSchemaName = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.MissionSchemaName = "Mission";
var missionSchema = new mongoose_1.default.Schema({
    user: {
        type: String,
        required: true,
        ref: "Users"
    },
    key: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
});
exports.default = mongoose_1.default.model(exports.MissionSchemaName, missionSchema);
