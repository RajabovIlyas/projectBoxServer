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
const providerType_1 = require("./providerType");
const Provider_1 = __importDefault(require("../../models/Provider"));
const sendMessage_1 = require("../../utils/sendMessage");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield providerType_1.getDataProvider(req);
    Provider_1.default.create(data)
        .then((result) => {
        sendMessage_1.sendMessageCompany(result)
            .then((result) => {
            res.status(200).json({ message: 'Данные сохранены успешно' });
        })
            .catch(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Provider_1.default.findByIdAndDelete(result.id);
            yield res.status(500).json({ message: 'Отправка рассылки не получилась!' });
        }));
    })
        .catch((err) => res.status(404).json({ message: 'Не верно введены данные!' }));
});
exports.default = {
    create,
};
