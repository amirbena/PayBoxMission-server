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
exports.deleteMission = exports.updateMission = exports.getMissionByKey = exports.getAllMissions = exports.createMission = void 0;
var mission_model_1 = __importDefault(require("../models/mission.model"));
var mission_enum_1 = require("../types/mission.enum");
var EncryptionModule = __importStar(require("./encryption.module"));
var http_status_codes_1 = require("http-status-codes");
var createMission = function (encryptedMission) { return __awaiter(void 0, void 0, void 0, function () {
    var missionToCreate, mission;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                missionToCreate = EncryptionModule.decryptMission(encryptedMission);
                return [4 /*yield*/, mission_model_1.default.create(missionToCreate)];
            case 1:
                mission = _a.sent();
                return [2 /*return*/, EncryptionModule.encryptMission(mission)];
        }
    });
}); };
exports.createMission = createMission;
var getAllMissions = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var missions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mission_model_1.default.find({ user: user })];
            case 1:
                missions = _a.sent();
                return [2 /*return*/, missions.map(function (mission) { return EncryptionModule.encryptMission(mission); })];
        }
    });
}); };
exports.getAllMissions = getAllMissions;
var getMissionByKey = function (user, encryptedKey) { return __awaiter(void 0, void 0, void 0, function () {
    var key, mission, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = EncryptionModule.decryptString(encryptedKey);
                return [4 /*yield*/, mission_model_1.default.findOne({ user: user, key: key })];
            case 1:
                mission = _a.sent();
                if (!mission) {
                    content = EncryptionModule.encryptString(mission_enum_1.MissionMessages.NOT_FOUND);
                    throw {
                        status: http_status_codes_1.NOT_FOUND,
                        content: content
                    };
                }
                return [2 /*return*/, EncryptionModule.encryptMission(mission)];
        }
    });
}); };
exports.getMissionByKey = getMissionByKey;
var buildObjectToUpdate = function (encryptedMission) {
    var bodyToUpdate = {};
    if (encryptedMission.key) {
        bodyToUpdate = Object.assign(bodyToUpdate, {
            key: EncryptionModule.decryptString(encryptedMission.key)
        });
    }
    if (encryptedMission.value) {
        bodyToUpdate = Object.assign(bodyToUpdate, {
            key: EncryptionModule.decryptObj(encryptedMission.value)
        });
    }
    return bodyToUpdate;
};
var updateMission = function (user, encryptedKey, encryptedMission) { return __awaiter(void 0, void 0, void 0, function () {
    var missionToUpdate, key, result, content, updatedMission, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                missionToUpdate = buildObjectToUpdate(encryptedMission);
                if (!Object.keys(missionToUpdate).length) {
                    return [2 /*return*/, {
                            status: http_status_codes_1.NO_CONTENT,
                            content: EncryptionModule.encryptString("Already Updated")
                        }];
                }
                key = EncryptionModule.decryptString(encryptedKey);
                return [4 /*yield*/, mission_model_1.default.update({ key: key, user: user }, missionToUpdate).exec()];
            case 1:
                result = _a.sent();
                if (!result) {
                    content = EncryptionModule.encryptString(mission_enum_1.MissionMessages.NOT_FOUND);
                    throw {
                        status: http_status_codes_1.NOT_FOUND,
                        content: content
                    };
                }
                return [4 /*yield*/, mission_model_1.default.findOne({ key: key, user: user })];
            case 2:
                updatedMission = _a.sent();
                if (!updatedMission) {
                    content = EncryptionModule.encryptString(mission_enum_1.MissionMessages.NOT_FOUND);
                    throw {
                        status: http_status_codes_1.NOT_FOUND,
                        content: content
                    };
                }
                return [2 /*return*/, EncryptionModule.encryptMission(updatedMission)];
        }
    });
}); };
exports.updateMission = updateMission;
var deleteMission = function (user, encryptedKey) { return __awaiter(void 0, void 0, void 0, function () {
    var key, result, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = EncryptionModule.decryptString(encryptedKey);
                return [4 /*yield*/, mission_model_1.default.deleteOne({ user: user, key: key }).exec()];
            case 1:
                result = _a.sent();
                if (!result) {
                    content = EncryptionModule.encryptString(mission_enum_1.MissionMessages.NOT_FOUND);
                    throw {
                        status: http_status_codes_1.NOT_FOUND,
                        content: content
                    };
                }
                return [2 /*return*/, EncryptionModule.encryptString(mission_enum_1.MissionMessages.DELETED)];
        }
    });
}); };
exports.deleteMission = deleteMission;
