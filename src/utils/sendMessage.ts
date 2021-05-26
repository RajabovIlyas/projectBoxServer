import nodemailer from 'nodemailer';
import {IUser} from '../models/User';
import {sendMessageData} from '../core/app';
import {IProvider} from '../models/Provider';
import {ICourse} from '../models/Course';

const htmlMessageAuthorization = (user: IUser) => {
  return (`<div style="text-align: center">`+
        `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
        `<p>Здравствуйте, ${user.name + ' ' + user.surname}<br/>` +
        'Благодарим Вас за регистрацию на сайте ProjectBox.pro<br/>' +
        'Чтобы завершить регистрацию, перейдите по ссылке:<br/>' +
        `${sendMessageData.urlProjectBox}/auth/check_key/${user._id}</p></div>`);
};

const htmlMessageProvider = (provider: IProvider) => {
  return (`<div style="text-align: center">`+
      `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
      `<p>Поставщик ${provider.fullName}<br/>` +
      `Должность: ${provider.position}<br/>` +
      `Номер телефона: ${provider.phone}<br/>` +
      `Email: ${provider.email}<br/>` +
      `Название компании: ${provider.nameCompany}<br/>` +
      `Краткое описание компании: ${provider.companyDescription}<br/>` +
      `Лучшие проекты: ${provider.bestProducts}</p></div>`);
};

const htmlMessageCourses = (course: ICourse) => {
  return (`<div style="text-align: center">`+
      `<img src="http://projectbox.pro/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente_.41fac85d.png">` +
      `<p>Хочет записаться на курс ${course.name} ${course.surname}<br/>` +
      `Email: ${course.email}<br/>` +
      `Номер телефона: ${course.phone}<br/>`+
      `Номер покупки: ${course.orderNumber}</p></div>`);
};


export const sendMessage = async (user: IUser) => {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    service: 'Yandex',
    port: 465,
    secure: true,
    auth: {
      user: sendMessageData.login,
      pass: sendMessageData.password,
    },
  });
  return transporter.sendMail({
    from: '<rajabovilya@yandex.ru>',
    to: '' + user.email,
    subject: 'authorization ProjectBox.pro ✔',
    text: user.name + ' ' + user.surname,
    html: htmlMessageAuthorization(user),
  });
};


export const sendMessageCompany = async (provider: IProvider) => {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    service: 'Yandex',
    port: 465,
    secure: true,
    auth: {
      user: sendMessageData.login,
      pass: sendMessageData.password,
    },
  });
  return transporter.sendMail({
    from: '<rajabovilya@yandex.ru>',
    to: sendMessageData.emailCompany,
    subject: 'Provider for ProjectBox.pro ✔',
    text: provider.fullName,
    html: htmlMessageProvider(provider),
  });
};


export const sendMessageCourses = async (course: ICourse) => {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    service: 'Yandex',
    port: 465,
    secure: true,
    auth: {
      user: sendMessageData.login,
      pass: sendMessageData.password,
    },
  });
  return transporter.sendMail({
    from: '<rajabovilya@yandex.ru>',
    to: sendMessageData.emailCompany,
    subject: 'Provider for ProjectBox.pro ✔',
    text: course.name,
    html: htmlMessageCourses(course),
  });
};
