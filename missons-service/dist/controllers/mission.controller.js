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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionController = void 0;
var express_1 = __importDefault(require("express"));
var MissionBusiness = __importStar(require("../businessLogic/mission.business"));
var EncryptionModule = __importStar(require("../businessLogic/encryption.module"));
var http_status_codes_1 = require("http-status-codes");
var EndPoints;
(function (EndPoints) {
    EndPoints["CREATE_MISSION"] = "";
    EndPoints["ALL_MISSIONS"] = "/:user";
    EndPoints["GET_UPDATE_DELETE_MISSION"] = "/:user/:key";
})(EndPoints || (EndPoints = {}));
var MissionController = /** @class */ (function () {
    function MissionController(path) {
        this.router = express_1.default.Router();
        this.path = path;
        this.intializeRoutes();
    }
    MissionController.prototype.getPath = function () {
        return this.path;
    };
    MissionController.prototype.getRouter = function () {
        return this.router;
    };
    MissionController.prototype.intializeRoutes = function () {
        this.router.post(EndPoints.CREATE_MISSION, this.createMission);
        this.router.get(EndPoints.ALL_MISSIONS, this.getAllMissions);
        this.router.get(EndPoints.GET_UPDATE_DELETE_MISSION, this.getSpecificMission);
        this.router.put(EndPoints.GET_UPDATE_DELETE_MISSION, this.updateMission);
        this.router.delete(EndPoints.GET_UPDATE_DELETE_MISSION, this.deleteMission);
    };
    MissionController.prototype.createMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var encryptedMission, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, MissionBusiness.createMission(req.body)];
                    case 1:
                        encryptedMission = _a.sent();
                        res.json(encryptedMission);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error_1.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MissionController.prototype.getAllMissions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, encryptedMissions, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.params.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, MissionBusiness.getAllMissions(user)];
                    case 2:
                        encryptedMissions = _a.sent();
                        res.json(encryptedMissions);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error_2.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MissionController.prototype.getSpecificMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, key, encryptedMission, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, user = _a.user, key = _a.key;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, MissionBusiness.getMissionByKey(user, key)];
                    case 2:
                        encryptedMission = _b.sent();
                        res.json(encryptedMission);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        if ("status" in error_3) {
                            return [2 /*return*/, res.status(error_3.status).send(error_3.content)];
                        }
                        res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error_3.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MissionController.prototype.updateMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, key, encryptedMissionToUpdate, encryptedMission, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, user = _a.user, key = _a.key;
                        encryptedMissionToUpdate = req.body;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, MissionBusiness.updateMission(user, key, encryptedMissionToUpdate)];
                    case 2:
                        encryptedMission = _b.sent();
                        res.json(encryptedMission);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        if ("status" in error_4) {
                            return [2 /*return*/, res.status(error_4.status).send(error_4.content)];
                        }
                        res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error_4.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MissionController.prototype.deleteMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, key, content, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, user = _a.user, key = _a.key;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, MissionBusiness.deleteMission(user, key)];
                    case 2:
                        content = _b.sent();
                        res.send(content);
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _b.sent();
                        if ("status" in error_5) {
                            return [2 /*return*/, res.status(error_5.status).send(error_5.content)];
                        }
                        res.status(http_status_codes_1.INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error_5.message));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return MissionController;
}());
exports.MissionController = MissionController;
