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
exports.sendMessageCourses = exports.sendMessageCompany = exports.sendMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_1 = require("../core/app");
const htmlMessageAuthorization = (user) => {
    return (`<div style="text-align: center">` +
        `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
        `<p>Здравствуйте, ${user.name + ' ' + user.surname}<br/>` +
        'Благодарим Вас за регистрацию на сайте ProjectBox.pro<br/>' +
        'Чтобы завершить регистрацию, перейдите по ссылке:<br/>' +
        `${app_1.sendMessageData.urlProjectBox}/auth/check_key/${user._id}</p></div>`);
};
const htmlMessageProvider = (provider) => {
    return (`<div style="text-align: center">` +
        `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
        `<p>Поставщик ${provider.fullName}<br/>` +
        `Должность: ${provider.position}<br/>` +
        `Номер телефона: ${provider.phone}<br/>` +
        `Email: ${provider.email}<br/>` +
        `Название компании: ${provider.nameCompany}<br/>` +
        `Краткое описание компании: ${provider.companyDescription}<br/>` +
        `Лучшие проекты: ${provider.bestProducts}</p></div>`);
};
const htmlMessageCourses = (course) => {
    return (`<div style="text-align: center">` +
        `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
        `<p>Хочет записаться на курс ${course.name} ${course.surname}<br/>` +
        `Email: ${course.email}<br/>` +
        `Номер телефона: ${course.phone}<br/>` +
        `Номер покупки: ${course.orderNumber}</p></div>`);
};
const sendMessage = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = yield nodemailer_1.default.createTransport({
        host: 'smtp.yandex.ru',
        service: 'Yandex',
        port: 465,
        secure: true,
        auth: {
            user: app_1.sendMessageData.login,
            pass: app_1.sendMessageData.password,
        },
    });
    return transporter.sendMail({
        from: '<rajabovilya@yandex.ru>',
        to: '' + user.email,
        subject: 'authorization ProjectBox.pro ✔',
        text: user.name + ' ' + user.surname,
        html: htmlMessageAuthorization(user),
    });
});
exports.sendMessage = sendMessage;
const sendMessageCompany = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = yield nodemailer_1.default.createTransport({
        host: 'smtp.yandex.ru',
        service: 'Yandex',
        port: 465,
        secure: true,
        auth: {
            user: app_1.sendMessageData.login,
            pass: app_1.sendMessageData.password,
        },
    });
    return transporter.sendMail({
        from: '<rajabovilya@yandex.ru>',
        to: app_1.sendMessageData.emailCompany,
        subject: 'Provider for ProjectBox.pro ✔',
        text: provider.fullName,
        html: htmlMessageProvider(provider),
    });
});
exports.sendMessageCompany = sendMessageCompany;
const sendMessageCourses = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = yield nodemailer_1.default.createTransport({
        host: 'smtp.yandex.ru',
        service: 'Yandex',
        port: 465,
        secure: true,
        auth: {
            user: app_1.sendMessageData.login,
            pass: app_1.sendMessageData.password,
        },
    });
    return transporter.sendMail({
        from: '<rajabovilya@yandex.ru>',
        to: app_1.sendMessageData.emailCompany,
        subject: 'Provider for ProjectBox.pro ✔',
        text: course.name,
        html: htmlMessageCourses(course),
    });
});
exports.sendMessageCourses = sendMessageCourses;
