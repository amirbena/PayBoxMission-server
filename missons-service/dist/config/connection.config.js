"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require("./dotenv.config");
var connectionString = process.env.DB_CONNECTION || "NO CONNECTION";
var successMessage = "Success to connect DB";
var failedMessage = "Failed to connect to DB";
mongoose_1.default.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(function (res) { return console.log(successMessage); }).catch(function (ex) { return console.log(failedMessage); });
