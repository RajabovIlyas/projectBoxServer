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
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('authGoogleGet', req.user);
    // @ts-ignore
    if (req === null || req === void 0 ? void 0 : req.user.token) {
        res.status(200).json(req.user);
    }
    else {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});
exports.default = { auth };
