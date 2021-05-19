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
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../../models/User"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const codeName = file.originalname.split('.');
        const name = uuid_1.v1() + '.' + codeName[codeName.length - 1];
        cb(null, name);
    },
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.upload = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 10240 * 10240 * 5,
    },
    fileFilter: fileFilter,
});
const changeAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)) {
        res.status(404).json({ message: 'Фото не было найдено' });
        return;
    }
    yield User_1.default.findById(req.userId).exec()
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if ((result === null || result === void 0 ? void 0 : result.avatar) && (result === null || result === void 0 ? void 0 : result.avatar.indexOf('/default.jpg')) === -1) {
            const oldPath = result.avatar.split('/');
            const fileNameWithPath = 'uploads/' + oldPath[oldPath.length - 1];
            if (fs_1.default.existsSync(fileNameWithPath)) {
                fs_1.default.unlink(fileNameWithPath, ((err) => { }));
            }
        }
        User_1.default.findByIdAndUpdate(req.userId, { avatar: 'https://projectbox-pro-server.herokuapp.com/uploads/' + req.file.filename }).exec()
            .then((result) => {
            res.status(200).json({ message: 'Изменение прошли успешно' });
        })
            .catch((err) => res.status(500).json({ message: 'Ошибка в сохранении данных' }));
    }));
});
exports.default = {
    changeAvatar,
};
