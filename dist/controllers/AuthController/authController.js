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
const authType_1 = require("./authType");
const bcryptjs_1 = require("bcryptjs");
const authHelper_1 = require("../../utils/authHelper");
const database_1 = require("../../database");
const sendMessage_1 = require("../../utils/sendMessage");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield authType_1.getDataSignUp(req);
    database_1.connect()
        .then((conn) => {
        if (result) {
            conn.query(`INSERT INTO user (id,name,surname,email,password) VALUES ('${result.id}', '${result.name}'
                ,'${result.surname}','${result.email}','${result.password}')`)
                .then((dataStatus) => __awaiter(void 0, void 0, void 0, function* () {
                sendMessage_1.sendMessage(result)
                    .then((result) => {
                    res.status(200).json({ message: 'Сылка для авторизации отправлено на почту' });
                })
                    .catch(() => res.status(500).json({ message: 'Отправка рассылки не получилась!' }));
            }))
                .catch((err) => {
                res.status(405).json({ message: 'Такой email уже существует!' });
            });
        }
        else {
            throw 404;
        }
    })
        .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
});
const authorization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    database_1.connect()
        .then((conn) => {
        conn.query(`UPDATE user SET authorization = true WHERE id = '${req.params.id}'`)
            .then((dataStatus) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            if (((_a = dataStatus[0]) === null || _a === void 0 ? void 0 : _a.affectedRows) === 0) {
                throw 404;
            }
            const token = yield authHelper_1.generateToken(req.params.id);
            res.status(200).json({ token: token });
        }))
            .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
    }).catch((err) => res.status(500).json({ message: 'Ошибка подключении к серверу' }));
});
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    database_1.connect()
        .then((conn) => {
        conn.query(`SELECT * FROM user WHERE email='${email}' AND authorization=true`)
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            // @ts-ignore
            if (result[0][0] && bcryptjs_1.compareSync(password, result[0][0].password)) {
                // @ts-ignore
                const token = yield authHelper_1.generateToken(result[0][0].id);
                res.status(200).json({ token: token });
            }
            else {
                throw 404;
            }
        }))
            .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
    })
        .catch((err) => res.status(500).json({ message: 'Ошибка подключении к серверу' }));
    // User.findOne({email, activate: true}).exec()
    //     .then(async (result) => {
    //       if (result && compareSync(password, result.password)) {
    //         const token = await generateToken(result.id);
    //         res.status(200).json({token: token});
    //       } else {
    //         throw 404;
    //       }
    //     })
    //     .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
});
const authMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.default = {
    signUp,
    logIn,
    authorization,
    authMe,
};
