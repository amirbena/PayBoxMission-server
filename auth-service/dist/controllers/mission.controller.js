"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var validation_1 = require("./../middlewares/validation");
var logTypes_enum_1 = require("../types/logTypes.enum");
var base_controller_1 = __importDefault(require("./base.controller"));
var passport_config_1 = require("../config/passport.config");
var missionsProxy_config_1 = __importDefault(require("../config/missionsProxy.config"));
var EncryptionModule = __importStar(require("../businessLogic/encryption.module"));
var auditLog_business_1 = require("../businessLogic/auditLog.business");
var http_status_codes_1 = require("http-status-codes");
var EndPoints;
(function (EndPoints) {
    EndPoints["CREATE_MISSION"] = "/";
    EndPoints["GET_ALL_MISSIONS_BY_USER"] = "/";
    EndPoints["GET_SPECIFIC_MISSION_FOR_USER"] = "/:key";
    EndPoints["UPDATE_MISSION_FOR_USER"] = "/:key";
    EndPoints["DELETE_MISSION_FOR_USER"] = "/:key";
})(EndPoints || (EndPoints = {}));
var ResponseMessage;
(function (ResponseMessage) {
    ResponseMessage["MISSION_CREATED"] = "Mission created succesfully";
    ResponseMessage["MISSION_FAILED_CREATION"] = "Mission failed to create";
    ResponseMessage["MISSION_GET_SUCCESS"] = "Fetched Mission Successfully";
    ResponseMessage["ALREADY_UPDATED"] = "User is already updated";
    ResponseMessage["MISSION_UPDATED"] = "Mission Updated Succesfully";
})(ResponseMessage || (ResponseMessage = {}));
var MissionsController = /** @class */ (function (_super) {
    __extends(MissionsController, _super);
    function MissionsController(path) {
        var _this = _super.call(this, path) || this;
        _this.missionEndPoint = "/";
        return _this;
    }
    MissionsController.prototype.endPointByUserAndKey = function (user, key) {
        return "" + this.missionEndPoint + user._id.toHexString() + (key && "/" + key);
    };
    MissionsController.prototype.intializeRoutes = function () {
        this.router.use(passport_config_1.authenticate());
        this.router.post(EndPoints.CREATE_MISSION, validation_1.validateMissionInput, this.createMission);
        this.router.get(EndPoints.GET_SPECIFIC_MISSION_FOR_USER, this.getMission);
        this.router.get(EndPoints.GET_ALL_MISSIONS_BY_USER, this.getAllMissions);
        this.router.put(EndPoints.UPDATE_MISSION_FOR_USER, this.updateMission);
        this.router.delete(EndPoints.DELETE_MISSION_FOR_USER, this.deleteMission);
    };
    MissionsController.prototype.createMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, key, log, value, body, response, mission, ex_1, message, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.user);
                        user = req.user;
                        key = req.body.key;
                        key = EncryptionModule.encryptString(key);
                        value = EncryptionModule.encryptObj(req.body.value);
                        body = {
                            key: key,
                            value: value,
                            user: user._id
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, missionsProxy_config_1.default.post(this.missionEndPoint, body)];
                    case 2:
                        response = _a.sent();
                        mission = EncryptionModule.decryptMission(response.data);
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_CREATED, ResponseMessage.MISSION_CREATED)];
                    case 3:
                        log = _a.sent();
                        res.json({ log: log, content: ResponseMessage.MISSION_CREATED, mission: mission });
                        return [3 /*break*/, 6];
                    case 4:
                        ex_1 = _a.sent();
                        message = EncryptionModule.decryptString(ex_1.response.data);
                        status = ex_1.response.status;
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_CREATION_FAILED, message)];
                    case 5:
                        log = _a.sent();
                        res.status(status).json({ log: log, content: message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MissionsController.prototype.defineUserAndEncryptKey = function (req) {
        var user = req.user;
        var key = req.params.key;
        key = EncryptionModule.encryptString(key);
        return { key: key, user: user };
    };
    MissionsController.prototype.getMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, key, endPoint, response, mission, ex_2, status, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.defineUserAndEncryptKey(req), user = _a.user, key = _a.key;
                        endPoint = this.endPointByUserAndKey(user, key);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, missionsProxy_config_1.default.get(endPoint)];
                    case 2:
                        response = _b.sent();
                        mission = EncryptionModule.decryptMission(response.data);
                        return [2 /*return*/, res.json({ mission: mission, content: ResponseMessage.MISSION_GET_SUCCESS })];
                    case 3:
                        ex_2 = _b.sent();
                        status = ex_2.response.status;
                        message = EncryptionModule.decryptString(ex_2.response.data);
                        res.status(status).send(message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MissionsController.prototype.getAllMissions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, endPoint, response, encryptedMissions, missions, ex_3, status, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = req.user;
                        endPoint = this.endPointByUserAndKey(user);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, missionsProxy_config_1.default.get(endPoint)];
                    case 2:
                        response = _a.sent();
                        encryptedMissions = response.data;
                        missions = encryptedMissions.map(function (encrypted) { return EncryptionModule.decryptMission(encrypted); });
                        return [2 /*return*/, res.json({ missions: missions, content: ResponseMessage.MISSION_GET_SUCCESS })];
                    case 3:
                        ex_3 = _a.sent();
                        status = ex_3.response.status;
                        message = EncryptionModule.decryptString(ex_3.response.data);
                        res.status(status).send(message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MissionsController.prototype.updateMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, originalKey, user, log, key, value, endPoint, body, response, mission, ex_4, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.defineUserAndEncryptKey(req), originalKey = _a.key, user = _a.user;
                        key = req.body.key;
                        if (key)
                            key = EncryptionModule.encryptString(key);
                        if (req.body.value)
                            value = EncryptionModule.encryptObj(req.body.value);
                        endPoint = this.endPointByUserAndKey(user, originalKey);
                        body = { key: key, value: value };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, missionsProxy_config_1.default.put(endPoint, body)];
                    case 2:
                        response = _b.sent();
                        if (response.status === http_status_codes_1.NO_CONTENT)
                            return [2 /*return*/, res.status(http_status_codes_1.NO_CONTENT).send(ResponseMessage.ALREADY_UPDATED)];
                        mission = EncryptionModule.decryptMission(response.data);
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_UPDATED, ResponseMessage.MISSION_UPDATED)];
                    case 3:
                        log = _b.sent();
                        res.json({ log: log, content: ResponseMessage.MISSION_UPDATED, mission: mission });
                        return [3 /*break*/, 6];
                    case 4:
                        ex_4 = _b.sent();
                        message = EncryptionModule.decryptString(ex_4.response.data);
                        status = ex_4.response.status;
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_UPDATE_FAILED, message)];
                    case 5:
                        log = _b.sent();
                        res.status(status).json({ log: log, content: message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MissionsController.prototype.deleteMission = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, key, user, endPoint, log, response, content, ex_5, message, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.defineUserAndEncryptKey(req), key = _a.key, user = _a.user;
                        endPoint = this.endPointByUserAndKey(user, key);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 6]);
                        return [4 /*yield*/, missionsProxy_config_1.default.delete(endPoint)];
                    case 2:
                        response = _b.sent();
                        content = EncryptionModule.decryptString(response.data);
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_DELETED, content)];
                    case 3:
                        log = _b.sent();
                        res.json({ log: log, content: content });
                        return [3 /*break*/, 6];
                    case 4:
                        ex_5 = _b.sent();
                        message = EncryptionModule.decryptString(ex_5.response.data);
                        status = ex_5.response.status;
                        return [4 /*yield*/, auditLog_business_1.insertAuditLog(user._id, logTypes_enum_1.LogTypes.MISSION_DELETE_FAILED, message)];
                    case 5:
                        log = _b.sent();
                        res.status(status).json({ log: log, content: message });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return MissionsController;
}(base_controller_1.default));
exports.default = MissionsController;
