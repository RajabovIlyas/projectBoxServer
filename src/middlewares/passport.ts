import {NextFunction, Request, Response} from 'express';


const refreshToken = async (req: Request, res: Response, next: NextFunction) => {

};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  next();
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
