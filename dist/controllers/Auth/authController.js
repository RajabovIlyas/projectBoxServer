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
const authType_1 = require("./authType");
const bcryptjs_1 = require("bcryptjs");
const authHelper_1 = require("../../utils/authHelper");
const sendMessage_1 = require("../../utils/sendMessage");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../../core/app");
const User_1 = __importDefault(require("../../models/User"));
const Token_1 = __importDefault(require("../../models/Token"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield authType_1.getDataSignUp(req);
    User_1.default.create(result)
        .then((result) => {
        sendMessage_1.sendMessage(result)
            .then((result) => {
            res.status(200).json({ message: 'Сылка для авторизации отправлено на почту' });
        })
            .catch(() => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.default.findByIdAndDelete(result.id);
            yield res.status(500).json({ message: 'Отправка рассылки не получилась!' });
        }));
    })
        .catch((err) => {
        if (err.message.indexOf('E11000') !== -1) {
            res.status(401).json({ message: 'Такой email уже существует!' });
        }
        else {
            res.status(404).json({ message: 'Не верно введены данные!' });
        }
    });
});
const authorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findById(req.params.id).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result === null || result === void 0 ? void 0 : result.authorization) {
            res.status(411).json({ message: 'Пользовател уже прошел верификацию!' });
        }
        else if (result) {
            User_1.default.findByIdAndUpdate(req.params.id, { authorization: true }).exec()
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                const token = yield authHelper_1.generateToken(req.params.id);
                res.status(200).json({ token: token });
            }));
        }
        else {
            throw 404;
        }
    }));
    //
    // User.findByIdAndUpdate(req.params.id, {authorization: true}).exec()
    //     .then(async (result)=>{
    //       const token = await generateToken(req.params.id);
    //       res.status(200).json({token: token});
    //     })
    //     .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
});
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //
    // connect()
    //     .then((conn) => {
    //       conn.query(`SELECT * FROM user WHERE email='${email}' AND authorization=true`)
    //           .then(async (result) => {
    //             // @ts-ignore
    //             if (result[0][0] && compareSync(password, result[0][0].password)) {
    //               // @ts-ignore
    //               const token = await generateToken(result[0][0].id);
    //               res.status(200).json({token: token});
    //             } else {
    //               throw 404;
    //             }
    //           })
    //           .catch((err) =>
    //             res.status(404).json({message: 'Не верно введены данные!'}),
    //           );
    //     })
    //     .catch((err) => res.status(500).json({message: 'Ошибка подключении к серверу'}));
    User_1.default.findOne({ email, authorization: true }).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if ((result === null || result === void 0 ? void 0 : result.id) && bcryptjs_1.compareSync(password, result.password)) {
            const token = yield authHelper_1.generateToken(result.id);
            res.status(200).json({ token: token });
        }
        else {
            throw 404;
        }
    }))
        .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
});
const authMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User_1.default.findById(req.user).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result) {
            const user = yield authType_1.getAuthData(result);
            res.status(200).json(user);
        }
        else {
            throw 404;
        }
    }))
        .catch((err) => {
        res.status(404).json({ message: 'Пользователь с таким id не найден!' });
    });
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('Authorization');
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.substr(7);
    if (!token) {
        res.status(401).json({ message: 'Токен не представлен' });
        return;
    }
    const payload = jsonwebtoken_1.default.verify(token, app_1.secret);
    Token_1.default.findOneAndDelete({ tokenId: payload.id }).exec()
        .then((token) => {
        res.status(200).json({ message: 'Токен успешно удален' });
    })
        .catch((err) => res.status(404).json('Токен не действителен'));
});
exports.default = {
    signUp,
    logIn,
    authorization,
    authMe,
    logout,
};
