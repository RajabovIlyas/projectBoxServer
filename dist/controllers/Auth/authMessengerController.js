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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../core/app");
const uuid_1 = require("uuid");
const authRedirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('authGoogleGet', req.user);
    // @ts-ignore
    const token = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.token;
    if (token) {
        yield res.redirect(`${app_1.sendMessageData.urlProjectBox}/google/${token}`);
        //  res.status(200).json(req.user);
    }
    else {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
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
    res.status(200).json({ signUpData });
});
exports.default = { authRedirect, authFacebook };
