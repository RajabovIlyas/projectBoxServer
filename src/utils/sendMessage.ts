import nodemailer from 'nodemailer';
import {ISignUp} from '../controllers/AuthController/authType';
import {sendMessageData} from '../core/app';

const htmlMessageAuthorization = (user: ISignUp) => {
  return (`<div style="text-align: center">`+
        `<img src="https://line-logic.by/static/media/Projectbox_logo_with_slogan_inverse_orange_on_transparente.b8f0d393.png">` +
        `<p>Здравствуйте, ${user.name + ' ' + user.surname}<br/>` +
        'Благодарим Вас за регистрацию на сайте ProjectBox.pro<br/>' +
        'Чтобы завершить регистрацию, перейдите по ссылке:<br/>' +
        `http://localhost:3000/auth/check_key/${user.id}</p></div>`);
};


export const sendMessage = async (user: ISignUp) => {
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
