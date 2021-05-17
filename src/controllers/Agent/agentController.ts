import {Request, Response} from 'express';
import Agent from '../../models/Agent';


const create=async (req: Request, res: Response) => {
  Agent.create({user: req.userId})
      .then((result)=>{
        res.status(200).json({message: 'Агент успешно создан!'});
      })
      .catch((err)=>{
        res.status(404).json({message: 'Не верно введены данные!'});
      });
};


export default {
  create,
};
