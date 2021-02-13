"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var BaseController = /** @class */ (function () {
    function BaseController(path) {
        this.router = express_1.default.Router();
        this.path = path;
        this.intializeRoutes();
    }
    BaseController.prototype.intializeRoutes = function () { };
    BaseController.prototype.getPath = function () {
        return this.path;
    };
    BaseController.prototype.getRouter = function () {
        return this.router;
    };
    return BaseController;
}());
exports.default = BaseController;
