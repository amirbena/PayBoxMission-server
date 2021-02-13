"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mission_controller_1 = require("./controllers/mission.controller");
require("./config/dotenv.config");
require("./config/connection.config");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(port) {
        this.app = express_1.default();
        this.origin = ["http://localhost:5000/"];
        this.controller = new mission_controller_1.MissionController('/');
        this.port = port;
        this.intialiazeMiddlewares();
        this.intialiazeRoutes();
    }
    App.prototype.intialiazeMiddlewares = function () {
        this.app.use(cors_1.default({ origin: this.origin }));
        this.app.use(body_parser_1.default.json());
    };
    App.prototype.intialiazeRoutes = function () {
        this.app.use(this.controller.getPath(), this.controller.getRouter());
    };
    App.prototype.listen = function () {
        var _this = this;
        return this.app.listen(this.port, function () {
            console.log("Wellcome to " + _this.port + " port");
        });
    };
    return App;
}());
exports.default = App;
