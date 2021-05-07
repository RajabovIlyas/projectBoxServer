import nodemailer from 'nodemailer';
import {IUser} from '../models/User';
import {sendMessageData} from '../core/app';

const htmlMessageAuthorization = (user: IUser) => {
  return (`<div style="text-align: center">`+
        `<img src="https://line-logic.by/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente.b8f0d393.png">` +
        `<p>Здравствуйте, ${user.name + ' ' + user.surname}<br/>` +
        'Благодарим Вас за регистрацию на сайте ProjectBox.pro<br/>' +
        'Чтобы завершить регистрацию, перейдите по ссылке:<br/>' +
        `${sendMessageData.urlProjectBox}/auth/check_key/${user._id}</p></div>`);
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
