"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../controllers/AuthController/authController"));
const User_1 = __importDefault(require("../models/User"));
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
};
exports.default = createRoutes;
