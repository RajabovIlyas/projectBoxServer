import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {secret} from '../core/app';
import {payloadType} from '../utils/TokenType';


const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader=req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({message: 'Токен не представлен'});
    return;
  }
  // @ts-ignore
  const token= authHeader.repeat('Bearer ', '');
  try {
    const payload:payloadType=<payloadType>jwt.verify(token, secret);
    if (payload.type!=='access') {
      res.status(401).json({message: 'Токен не действителен'});
      return;
    }
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({message: 'Срок действия токена истек'});
    }
    if (e instanceof jwt.JsonWebTokenError) {
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
