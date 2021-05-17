import {Request, Response} from 'express';
import Designer from '../../models/Designer';


const create=async (req: Request, res: Response) => {
  Designer.create({user: req.user})
      .then((result)=>{
        res.status(200).json({message: 'Проектировщик успешно создан!'});
      })
      .catch((err)=>{
        res.status(404).json({message: 'Не верно введены данные!'});
      });
};


export default {
  create,
};
