import {Request, Response} from 'express';
import {getDataSignUp, ISignUp} from './authType';
import bcrypt, {compareSync} from 'bcryptjs';
import {generateToken} from '../../utils/authHelper';
import {sendMessage} from '../../utils/sendMessage';
import {payloadType} from '../../utils/TokenType';
import jwt from 'jsonwebtoken';
import {secret} from '../../core/app';
import User from '../../models/User';
import Token from '../../models/Token';


const signUp = async (req: Request, res: Response) => {
  const result: ISignUp | undefined = await getDataSignUp(req);
  User.create(result)
      .then((result)=>{
        sendMessage(result)
            .then((result) => {
              res.status(200).json({message: 'Сылка для авторизации отправлено на почту'});
            })
            .catch(() => res.status(500).json({message: 'Отправка рассылки не получилась!'}));
      })
      .catch((err)=>res.status(404).json({message: 'Не верно введены данные!'}));
};

const authorization = async (req: Request, res: Response) => {
  User.findByIdAndUpdate(req.params.id, {authorization: true}).exec()
      .then(async (result)=>{
        const token = await generateToken(req.params.id);
        res.status(200).json({token: token});
      })
      .catch((err)=>res.status(404).json({message: 'Не верно введены данные!'}));
};

const logIn = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  //
  // connect()
  //     .then((conn) => {
  //       conn.query(`SELECT * FROM user WHERE email='${email}' AND authorization=true`)
  //           .then(async (result) => {
  //             // @ts-ignore
  //             if (result[0][0] && compareSync(password, result[0][0].password)) {
  //               // @ts-ignore
  //               const token = await generateToken(result[0][0].id);
  //               res.status(200).json({token: token});
  //             } else {
  //               throw 404;
  //             }
  //           })
  //           .catch((err) =>
  //             res.status(404).json({message: 'Не верно введены данные!'}),
  //           );
  //     })
  //     .catch((err) => res.status(500).json({message: 'Ошибка подключении к серверу'}));

  User.findOne({email, authorization: true}).exec()
      .then(async (result) => {
        if (result?.id && compareSync(password, result.password)) {
          const token = await generateToken(result.id);
          res.status(200).json({token: token});
        } else {
          throw 404;
        }
      })
      .catch((err) => res.status(404).json({message: 'Не верно введены данные!'}));
};


const authMe = async (req: Request, res: Response) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.substr(7);
  if (!token) {
    res.status(401).json({message: 'Токен не представлен'});
    return;
  }
  const payload: payloadType = <payloadType>jwt.verify(token, secret);
  Token.findOne({tokenId: payload.id}).populate({path: 'user'}).exec()
      .then((token)=>{
        if (token) {
          res.status(200).json(token.userId);
        } else {
          throw 404;
        }
      })
      .catch((err)=>res.status(404).json('Токен не действителен'));
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.substr(7);
  if (!token) {
    res.status(401).json({message: 'Токен не представлен'});
    return;
  }
  const payload: payloadType = <payloadType>jwt.verify(token, secret);
  Token.findOneAndDelete({tokenId: payload.id}).exec()
      .then((token)=>{
        res.status(200).json({message: 'Токен успешно удален'});
      })
      .catch((err)=>res.status(404).json('Токен не действителен'));
};


export default {
  signUp,
  logIn,
  authorization,
  authMe,
  logout,
};
