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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../core/app");
const Token_1 = __importDefault(require("../models/Token"));
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Токен не представлен' });
        return;
    }
    const token = authHeader.substr(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, app_1.secret);
        if (payload.type !== 'access') {
            res.status(401).json({ message: 'Токен не действителен' });
            return;
        }
        Token_1.default.findOne({ tokenId: payload.id }).exec()
            .then((result) => {
            if (result) {
                req.user = result.user;
                next();
            }
            else {
                throw 404;
            }
        })
            .catch((err) => res.status(401).json({ message: 'Токен не действителен' }));
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Срок действия токена истек' });
        }
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ message: 'Токен не действителен' });
        }
        else {
            res.status(401).json({ message: 'Токен не действителен' });
        }
    }
});
const authDesignerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
});
const authAgentMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
});
exports.default = {
    authMiddleware,
    authAgentMiddleware,
    authDesignerMiddleware,
};
