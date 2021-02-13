"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMission = exports.decryptMission = exports.decryptObj = exports.encryptObj = exports.decryptString = exports.encryptString = void 0;
var crypto_js_1 = require("crypto-js");
require("../config/dotenv.config");
var ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "key";
function encryptString(plainText) {
    var encryptedObj = crypto_js_1.AES.encrypt(plainText, ENCRYPTION_KEY);
    return encryptedObj.toString();
}
exports.encryptString = encryptString;
function decryptString(encryptedText) {
    var decryptedObj = crypto_js_1.AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return decryptedObj.toString(crypto_js_1.enc.Utf8);
}
exports.decryptString = decryptString;
function encryptObj(plainObject) {
    var stringedObject = JSON.stringify(plainObject);
    return encryptString(stringedObject);
}
exports.encryptObj = encryptObj;
function decryptObj(encryptedObj) {
    var decryptedStrObj = decryptString(encryptedObj);
    return JSON.parse(decryptedStrObj);
}
exports.decryptObj = decryptObj;
function decryptMission(mission) {
    var user = mission.user;
    var key = decryptString(mission.key);
    var value = decryptObj(mission.value);
    return {
        user: user,
        key: key,
        value: value
    };
}
exports.decryptMission = decryptMission;
function encryptMission(mission) {
    var user = mission.user;
    var key = encryptString(mission.key);
    var value = encryptObj(mission.value);
    return {
        user: user,
        key: key,
        value: value
    };
}
exports.encryptMission = encryptMission;
