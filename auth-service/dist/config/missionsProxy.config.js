"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var baseURL = "http://localhost:5002/";
var missionProxy = axios_1.default.create({
    baseURL: baseURL
});
exports.default = missionProxy;
