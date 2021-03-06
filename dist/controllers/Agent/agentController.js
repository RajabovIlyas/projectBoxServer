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
const Agent_1 = __importDefault(require("../../models/Agent"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    Agent_1.default.create({ user: req.userId })
        .then((result) => {
        res.status(200).json({ message: 'Агент успешно создан!' });
    })
        .catch((err) => {
        res.status(404).json({ message: 'Не верно введены данные!' });
    });
});
exports.default = {
    create,
};
