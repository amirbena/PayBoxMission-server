"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.JWTStartegyName = void 0;
require("./dotenv.config");
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var TOKEN_KEY = process.env.TOKEN_KEY;
exports.JWTStartegyName = "jwt";
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_KEY
}, function (payload, done) {
    return done(null, payload);
}));
var authenticate = function () { return passport_1.default.authenticate(exports.JWTStartegyName, { session: false }); };
exports.authenticate = authenticate;
