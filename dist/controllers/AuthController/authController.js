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
const nodemailer_1 = __importDefault(require("nodemailer"));
const authType_1 = require("./authType");
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = require("bcryptjs");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signData = yield authType_1.getDataSignUp(req);
    User_1.default.create(signData)
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const transporter = yield nodemailer_1.default.createTransport({
            host: 'smtp.yandex.ru',
            service: 'Yandex',
            port: 465,
            secure: true,
            auth: {
                user: 'rajabovilya@yandex.ru',
                pass: 'ilyas2310',
            },
        });
        transporter.sendMail({
            from: '<rajabovilya@yandex.ru>',
            to: '' + result.email,
            subject: 'authorization ProjectBox.pro ✔',
            text: result.name + ' ' + result.surname,
            html: `<b>${'id: ' + result.id.toString()}</b>`,
        }).then((result) => {
            res.status(200).json({ message: 'Сылка для авторизации отправлено на почту' });
        })
            .catch(() => res.status(500).json({ message: 'Отправка рассылки не получилась!' }));
    }))
        .catch((err) => {
        res.status(404).json({ message: 'Не верно введены данные!' });
    });
});
const authorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findByIdAndUpdate(req.params.id, { authorization: true }).exec()
        .then((result) => {
        res.status(200).json({ message: 'Пользователь авторизован' });
    })
        .catch((err) => {
        res.status(404).json({ message: 'Не верно введены данные!' });
    });
});
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    User_1.default.findOne({ email, activate: true }).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result && bcryptjs_1.compareSync(password, result.password)) {
            res.status(200).json({ message: 'Авторизация прошла успешно' });
        }
        else {
            throw 404;
        }
    }))
        .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
});
const authMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.default = {
    signUp,
    logIn,
    authorization,
    authMe,
};
