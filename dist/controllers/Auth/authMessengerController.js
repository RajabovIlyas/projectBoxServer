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
const app_1 = require("../../core/app");
const uuid_1 = require("uuid");
const authHelper_1 = require("../../utils/authHelper");
const User_1 = __importDefault(require("../../models/User"));
const sendToken = (signUpData, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.findOne({ email: signUpData.email }).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result === null || result === void 0 ? void 0 : result.id) {
            yield res.redirect(`${app_1.sendMessageData.urlProjectBox}/google/${yield authHelper_1.generateToken(result.id)}`);
        }
        else {
            // @ts-ignore
            User_1.default.create(Object.assign(Object.assign({}, signUpData), { authorization: true }))
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result === null || result === void 0 ? void 0 : result.id) {
                    yield res.redirect(`${app_1.sendMessageData.urlProjectBox}/google/${yield authHelper_1.generateToken(result.id)}`);
                }
                else {
                    throw 500;
                }
            })).catch((err) => res.redirect(`${app_1.sendMessageData.urlProjectBox}`));
        }
    }))
        .catch((err) => res.redirect(`${app_1.sendMessageData.urlProjectBox}`));
});
const authGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const { email, picture, given_name, family_name } = (_a = req.user) === null || _a === void 0 ? void 0 : _a._json;
    const signUpData = {
        surname: family_name,
        name: given_name,
        email: email,
        password: uuid_1.v4(),
        avatar: picture,
    };
    yield sendToken(signUpData, res);
});
const authFacebook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log('authFacebookGet', req.user);
    // @ts-ignore
    const { email, last_name, first_name, picture } = req.user._json;
    const avatar = (_b = picture === null || picture === void 0 ? void 0 : picture.data) === null || _b === void 0 ? void 0 : _b.url;
    const signUpData = {
        surname: last_name,
        name: first_name,
        email: email,
        password: uuid_1.v4(),
        avatar: avatar,
    };
    yield sendToken(signUpData, res);
});
exports.default = { authGoogle, authFacebook };
