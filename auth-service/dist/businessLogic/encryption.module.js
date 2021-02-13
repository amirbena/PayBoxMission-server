"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptObj = exports.encryptObj = exports.decryptString = exports.encryptString = void 0;
var crypto_js_1 = require("crypto-js");
require("../config/dotenv.config");
var convertCharacter = function (character) {
    var dictonary = {
        '{': '}',
        '}': '{'
    };
    return dictonary[character] ? dictonary[character] : character;
};
var ENCRYPTION_KEY = process.env.ENCRYPTOION_KEY || "key";
function convertNestedObjectToString(object) {
    var newStrArr = JSON.stringify(object).split('')
        .map(function (character) { return convertCharacter(character); });
    return newStrArr.join('');
}
function convertStringToNestedObject(str) {
    var newStrArr = str.split('').map(function (character) { return convertCharacter(character); });
    return JSON.parse(newStrArr.join(''));
}
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
    var stringedObject = convertNestedObjectToString(plainObject);
    return encryptString(stringedObject);
}
exports.encryptObj = encryptObj;
function decryptObj(encryptedObj) {
    var decryptedStrObj = decryptString(encryptedObj);
    return convertStringToNestedObject(decryptedStrObj);
}
exports.decryptObj = decryptObj;
