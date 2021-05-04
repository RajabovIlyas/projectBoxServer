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
const authController_1 = __importDefault(require("../controllers/AuthController/authController"));
const User_1 = __importDefault(require("../models/User"));
const authType_1 = require("../controllers/AuthController/authType");
const sendMessage_1 = require("../utils/sendMessage");
const createRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    app.delete('/api/user/:id', (req, res) => {
        User_1.default.findByIdAndDelete(req.params.id)
            .exec()
            .then((result) => res.status(200).json({ message: 'Данные успешно удалены!' }))
            .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
    });
    app.post('/api/sign-up', authController_1.default.signUp);
    app.put('/api/authorization/:id', authController_1.default.authorization);
    app.post('/api/log-in/', authController_1.default.logIn);
    app.post('/api/user/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield authType_1.getDataSignUp(req);
        if (result) {
            sendMessage_1.sendMessage(result)
                .then((result) => {
                res.status(200).json({ message: 'Сылка для авторизации отправлено на почту' });
            })
                .catch(() => res.status(500).json({ message: 'Отправка рассылки не получилась!' }));
        }
        else {
            res.status(500).json({ message: 'Нет данных' });
        }
    }));
};
exports.default = createRoutes;
