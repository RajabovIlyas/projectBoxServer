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
exports.removeToken = exports.findToken = exports.generateToken = exports.replaceDbToken = exports.generateAccessToken = void 0;
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../core/app");
const database_1 = require("../database");
const generateAccessToken = () => {
    const payload = {
        id: uuid_1.v4(),
        type: app_1.tokens.access.type,
    };
    return {
        id: payload.id,
        token: jsonwebtoken_1.default.sign(payload, app_1.secret),
    };
};
exports.generateAccessToken = generateAccessToken;
const replaceDbToken = (tokenId, userId) => {
    database_1.connect()
        .then((conn) => {
        conn.query(`INSERT INTO token  (userId,tokenId) VALUES ('${userId}','${tokenId}')`);
    });
};
exports.replaceDbToken = replaceDbToken;
const generateToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenAll = exports.generateAccessToken();
    yield exports.replaceDbToken(tokenAll.id, userId);
    return tokenAll.token;
});
exports.generateToken = generateToken;
const findToken = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.connect()
        .then((conn) => {
        return conn.query(`SELECT * FROM token WHERE tokenId='${tokenId}'`);
    });
});
exports.findToken = findToken;
const removeToken = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    return database_1.connect()
        .then((conn) => {
        return conn.query(`DELETE FROM token WHERE  tokenId='${tokenId}'`);
    });
});
exports.removeToken = removeToken;
