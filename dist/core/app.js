"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageData = exports.tokens = exports.secret = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
exports.MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI :
    'mongodb+srv://root:root@beautysalon.hsvsc.mongodb.net/projectboxpro?retryWrites=true&w=majority';
exports.secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '/78"5ad^V62q6oM6sn`k?cIN"|JF%d';
exports.tokens = {
    access: {
        type: process.env.TOKEN_ACCESS_TYPE ? process.env.TOKEN_ACCESS_TYPE : 'access',
        expiresIn: process.env.TOKEN_ACCESS_EXPIRESS_IN ? process.env.TOKEN_ACCESS_EXPIRESS_IN : '30m',
    },
    refresh: {
        type: process.env.TOKEN_REFRESH_TYPE ? process.env.TOKEN_REFRESH_TYPE : 'refresh',
        expiresIn: process.env.TOKEN_REFRESH_EXPIRESS_IN ? process.env.TOKEN_REFRESH_EXPIRESS_IN : '50m',
    },
};
exports.sendMessageData = {
    login: process.env.EMAIL_LOGIN ? process.env.EMAIL_LOGIN : '',
    password: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD : '',
};
