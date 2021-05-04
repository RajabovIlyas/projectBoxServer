import {Request, Response} from 'express';
import nodemailer from 'nodemailer';


import {getDataSignUp, ISignUp} from './authType';
import User from '../../models/User';
import bcrypt, {compareSync} from 'bcryptjs';
import {generateToken} from '../../utils/authHelper';
import {connect} from '../../database';
import {sendMessage} from '../../utils/sendMessage';


const signUp = async (req: Request, res: Response) => {
  const result: ISignUp|undefined = await getDataSignUp(req);
  connect()
      .then((conn) => {
        if (result) {
          conn.query(`INSERT INTO user (id,name,surname,email,password) VALUES ('${result.id}', '${result.name}'
                ,'${result.surname}','${result.email}','${result.password}')`)
              .then(async (dataStatus) => {
                sendMessage(result)
                    .then((result) => {
                      res.status(200).json({message: 'Сылка для авторизации отправлено на почту'});
                    })
                    .catch(() => res.status(500).json({message: 'Отправка рассылки не получилась!'}));
              })
              .catch((err) => {
                res.status(405).json({message: 'Такой email уже существует!'});
              });
        } else {
          throw 404;
        }
      })
      .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
};

const authorization = async (req: Request, res: Response) => {
  connect()
      .then((conn)=>{
        conn.query(`UPDATE user SET authorization = true WHERE id = '${req.params.id}'`)
            .then(async (dataStatus)=>{
              // @ts-ignore
              if (dataStatus[0]?.affectedRows===0) {
                throw 404;
              }
              const token = await generateToken(req.params.id);
              res.status(200).json({token: token});
            })
            .catch((err)=>res.status(404).json({message: 'Не верно введены данные!'}));
      }).catch((err)=> res.status(500).json({message: 'Ошибка подключении к серверу'}));
};

const logIn = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  connect()
      .then((conn)=>{
        conn.query(`SELECT * FROM user WHERE email='${email}' AND authorization=true`)
            .then(async (result)=>{
              // @ts-ignore
              if (result[0][0] && compareSync(password, result[0][0].password)) {
                // @ts-ignore
                const token = await generateToken(result[0][0].id);
                res.status(200).json({token: token});
              } else {
                throw 404;
              }
            })
            .catch((err)=>
              res.status(404).json({message: 'Не верно введены данные!'}),
            );
      })
      .catch((err)=> res.status(500).json({message: 'Ошибка подключении к серверу'}));

  // User.findOne({email, activate: true}).exec()
  //     .then(async (result) => {
  //       if (result && compareSync(password, result.password)) {
  //         const token = await generateToken(result.id);
  //         res.status(200).json({token: token});
  //       } else {
  //         throw 404;
  //       }
  //     })
  //     .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
};


const authMe = async (req: Request, res: Response) => {

};


export default {
  signUp,
  logIn,
  authorization,
  authMe,
};
