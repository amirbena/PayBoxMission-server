"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UsersSchemaName = "Users";
var MissionSchemaName = "Missions";
var missionSchema = new mongoose_1.default.Schema({
    user: {
        type: String,
        required: true,
        ref: UsersSchemaName
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
exports.default = mongoose_1.default.model(MissionSchemaName, missionSchema);
