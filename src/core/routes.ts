import {Request, Response, Router} from 'express';
import Auth from '../controllers/AuthController/authController';
import User from '../models/User';
import {getDataSignUp, ISignUp} from '../controllers/AuthController/authType';
import {sendMessage} from '../utils/sendMessage';

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
  app.post('/api/log-in/', Auth.logIn);

  app.post('/api/user/send', async (req:Request, res:Response)=>{
    const result: ISignUp|undefined = await getDataSignUp(req);
    if (result) {
      sendMessage(result)
          .then((result) => {
            res.status(200).json({message: 'Сылка для авторизации отправлено на почту'});
          })
          .catch(() => res.status(500).json({message: 'Отправка рассылки не получилась!'}));
    } else {
      res.status(500).json({message: 'Нет данных'});
    }
  });
};

export default createRoutes;
