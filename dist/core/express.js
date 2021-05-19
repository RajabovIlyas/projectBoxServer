"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PATCH, DELETE, PUT',
    allowedHeaders: 'Content-Type, Authorization',
};
const customizationExpress = (app) => {
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(require('morgan')('dev'));
    app.use('/uploads', express_1.default.static('uploads'));
    app.use(cors_1.default({
        origin: '*',
        methods: 'GET, POST, PATCH, DELETE, PUT',
        allowedHeaders: 'Content-Type, Authorization',
    }));
    app.use(body_parser_1.default.json());
    app.use(cookie_session_1.default({
        name: 'tuto-session',
        keys: ['key1', 'key2'],
    }));
    app.use(cookie_parser_1.default());
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
};
exports.default = customizationExpress;
