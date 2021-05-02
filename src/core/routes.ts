import {Request, Response, Router} from 'express';
import Auth from '../controllers/AuthController/authController';
import User from "../models/User";

const createRoutes = (app: Router) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

  app.delete('/api/user/:id', (req:Request, res:Response)=>{
    User.findByIdAndDelete(req.params.id)
        .exec()
        .then((result)=>res.status(200).json({message: 'Данные успешно удалены!'}))
        .catch((err)=>res.status(404).json({message: 'Не верно введены данные!'}));
  });

  app.post('/api/sign-up', Auth.signUp);
  app.put('/api/authorization/:id', Auth.authorization);
};

export default createRoutes;
