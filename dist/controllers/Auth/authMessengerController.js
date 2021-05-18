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
    var _a, _b, _c, _d, _e;
    // @ts-ignore
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.emails[0].value;
    // @ts-ignore
    const fullName = { surname: (_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.familyName, name: (_e = (_d = req.user) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.givenName };
    const signUpData = {
        name: fullName.name,
        surname: fullName.surname,
        email: email,
        password: uuid_1.v4(),
    };
    yield sendToken(signUpData, res);
});
const authFacebook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('authFacebookGet', req.user);
    // @ts-ignore
    const email = req.user.emails[0].value;
    // @ts-ignore
    const fullName = req.user.name;
    const signUpData = {
        surname: fullName.familyName,
        name: fullName.givenName,
        email: email,
        password: uuid_1.v4(),
    };
    yield sendToken(signUpData, res);
});
exports.default = { authGoogle, authFacebook };
