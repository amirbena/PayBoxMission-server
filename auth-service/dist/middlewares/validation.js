"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMissionInput = exports.validateUserNamePassword = void 0;
var http_status_codes_1 = require("http-status-codes");
var EMPTY_BODY = "Empty body, please fill data";
var FailedUserNamePasswordInput;
(function (FailedUserNamePasswordInput) {
    FailedUserNamePasswordInput["USER_NAME_INVALID"] = "User name empty or invalid, check again";
    FailedUserNamePasswordInput["PASSWORD_INVALID"] = "Password empty or invalid, check again";
})(FailedUserNamePasswordInput || (FailedUserNamePasswordInput = {}));
var FailedMissionInput;
(function (FailedMissionInput) {
    FailedMissionInput["KEY_INVALID"] = "Key invalid, check again data";
    FailedMissionInput["VALUE_INVALID"] = "Value invalid, check again data";
})(FailedMissionInput || (FailedMissionInput = {}));
var validateUserNamePassword = function (req, res, next) {
    if (!req.body)
        return res.status(http_status_codes_1.BAD_REQUEST).send(EMPTY_BODY);
    if (!req.body.userName || typeof req.body.userName !== "string")
        return res.status(http_status_codes_1.BAD_REQUEST).send(FailedUserNamePasswordInput.USER_NAME_INVALID);
    if (!req.body.password || typeof req.body.userName !== "string")
        return res.status(http_status_codes_1.BAD_REQUEST).send(FailedUserNamePasswordInput.PASSWORD_INVALID);
    next();
};
exports.validateUserNamePassword = validateUserNamePassword;
var validateMissionInput = function (req, res, next) {
    if (!req.body)
        return res.status(http_status_codes_1.BAD_REQUEST).send(EMPTY_BODY);
    if (!req.body.key || typeof req.body.key !== "string")
        return res.status(http_status_codes_1.BAD_REQUEST).send(FailedMissionInput.KEY_INVALID);
    if (!req.body.value || typeof req.body.value !== "object")
        return res.status(http_status_codes_1.BAD_REQUEST).send(FailedMissionInput.VALUE_INVALID);
    next();
};
exports.validateMissionInput = validateMissionInput;
