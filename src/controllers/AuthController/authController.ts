import {Request, Response} from 'express';
import nodemailer from 'nodemailer';


import {getDataSignUp, ISignUp} from './authType';
import User from '../../models/User';
import {compareSync} from 'bcryptjs';


const signUp = async (req: Request, res: Response) => {
  const signData: ISignUp = await getDataSignUp(req);
  User.create(signData)
      .then(async (result) => {
        const transporter = await nodemailer.createTransport({
          host: 'smtp.yandex.ru',
          service: 'Yandex',
          port: 465,
          secure: true,
          auth: {
            user: 'rajabovilya@yandex.ru',
            pass: 'ilyas2310',
          },
        });
        transporter.sendMail({
          from: '<rajabovilya@yandex.ru>',
          to: '' + result.email,
          subject: 'authorization ProjectBox.pro ✔',
          text: result.name+' '+result.surname,
          html: `<b>${'id: '+result.id.toString()}</b>`,
        }).then((result) => {
          res.status(200).json({message: 'Сылка для авторизации отправлено на почту'});
        })
            .catch(()=>res.status(500).json({message: 'Отправка рассылки не получилась!'}));
      })
      .catch((err) => {
        res.status(404).json({message: 'Не верно введены данные!'});
      });
};

const authorization = async (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.params.id, {authorization: true}).exec()
      .then((result) => {
        res.status(200).json({message: 'Пользователь авторизован'});
      })
      .catch((err) => {
        res.status(404).json({message: 'Не верно введены данные!'});
      });
};

const logIn = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  User.findOne({email, activate: true}).exec()
      .then(async (result) => {
        if (result && compareSync(password, result.password)) {
          res.status(200).json({message: 'Авторизация прошла успешно'});
        } else {
          throw 404;
        }
      })
      .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
};


const authMe = async (req: Request, res: Response) => {

};


export default {
  signUp,
  logIn,
  authorization,
  authMe,
};
