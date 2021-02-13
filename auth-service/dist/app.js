"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mission_controller_1 = __importDefault(require("./controllers/mission.controller"));
require("./config/passport.config");
require("./config/connection.config");
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var user_controller_1 = __importDefault(require("./controllers/user.controller"));
var log_controller_1 = __importDefault(require("./controllers/log.controller"));
var express_1 = __importDefault(require("express"));
var App = /** @class */ (function () {
    function App(port) {
        this.app = express_1.default();
        this.origin = ["http://localhost:3000/"];
        this.controllers = [
            new user_controller_1.default("/users"),
            new log_controller_1.default("/logs"),
            new mission_controller_1.default('/missions')
        ];
        this.port = port;
        this.intialiazeMiddlewares();
        this.intialiazeRoutes();
    }
    App.prototype.intialiazeMiddlewares = function () {
        this.app.use(cors_1.default({ origin: this.origin }));
        this.app.use(bodyParser.json());
    };
    App.prototype.intialiazeRoutes = function () {
        var _this = this;
        this.controllers.forEach(function (controller) { return _this.app.use(controller.getPath(), controller.getRouter()); });
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
