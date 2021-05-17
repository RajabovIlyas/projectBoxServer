import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {secret} from '../core/app';
import {payloadType} from '../utils/TokenType';
import Token from '../models/Token';


const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader=req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({message: 'Токен не представлен'});
    return;
  }
  const token= authHeader.substr(7);
  try {
    const payload:payloadType=<payloadType>jwt.verify(token, secret);
    if (payload.type!=='access') {
      res.status(401).json({message: 'Токен не действителен'});
      return;
    }
    Token.findOne({tokenId: payload.id}).exec()
        .then((result)=>{
          if (result) {
            req.user =result.user;
            next();
          } else {
            throw 404;
          }
        })
        .catch((err)=>res.status(401).json({message: 'Токен не действителен'}));
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({message: 'Срок действия токена истек'});
    }
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({message: 'Токен не действителен'});
    } else {
      res.status(401).json({message: 'Токен не действителен'});
    }
  }
};

const authDesignerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next();
};

const authAgentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next();
};

export default {
  authMiddleware,
  authAgentMiddleware,
  authDesignerMiddleware,
};
