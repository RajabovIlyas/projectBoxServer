"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const customizationExpress = (app) => {
    app.use(require('morgan')('dev'));
    app.use(body_parser_1.default.json());
    app.use(cookie_parser_1.default());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(require('cors')());
};
exports.default = customizationExpress;
