"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToken = exports.updateTokens = exports.removeToken = exports.replaceDbRefreshToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const uuid_1 = require("uuid");
const jwt = require('jsonwebtoken');
const Token_1 = __importDefault(require("../models/Token"));
const app_1 = require("../core/app");
const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: app_1.tokens.access.type,
    };
    const options = { expiresIn: app_1.tokens.access.expiresIn };
    return jwt.sign(payload, app_1.secret, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = () => {
    const payload = {
        id: uuid_1.v4(),
        type: app_1.tokens.refresh.type,
    };
    const options = { expiresIn: app_1.tokens.refresh.expiresIn };
    return {
        id: payload.id,
        token: jwt.sign(payload, app_1.secret, options),
    };
};
exports.generateRefreshToken = generateRefreshToken;
const replaceDbRefreshToken = (tokenId, userId) => {
    Token_1.default.findOneAndDelete({ userId })
        .exec()
        .then(() => {
        Token_1.default.create({ tokenId, userId });
    })
        .catch(() => {
        Token_1.default.create({ tokenId, userId });
    });
};
exports.replaceDbRefreshToken = replaceDbRefreshToken;
const removeToken = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Token_1.default.findOneAndDelete({ tokenId }).exec()
        .then((response) => {
        return true;
    })
        .catch((e) => {
        return false;
    });
});
exports.removeToken = removeToken;
const updateTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield exports.generateAccessToken(userId);
    const refreshToken = yield exports.generateRefreshToken();
    yield exports.replaceDbRefreshToken(refreshToken.id, userId);
    return {
        accessToken,
        refreshToken: refreshToken.token,
    };
});
exports.updateTokens = updateTokens;
const findToken = (payload) => {
    return Token_1.default.findOne(payload)
        .then((result) => {
        return true;
    })
        .catch((e) => {
        return false;
    });
};
exports.findToken = findToken;
