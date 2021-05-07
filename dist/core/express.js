"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const customizationExpress = (app) => {
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(require('morgan')('dev'));
    app.use(require('cors')());
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
