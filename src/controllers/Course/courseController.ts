import {Request, Response} from 'express';
import Course from '../../models/Course';
import {sendMessageCourses} from '../../utils/sendMessage';


const create=async (req: Request, res: Response) => {
  Course.create({...req.body})
      .then((result)=>{
        sendMessageCourses(result)
            .then((result) => {
              res.status(200).json({message: 'Сылка о покупке курса отправлена'});
            })
            .catch(async () => {
              await Course.findByIdAndDelete(result.id);
              await res.status(500).json({message: 'Отправка рассылки не получилась!'});
            });
      })
      .catch((err)=>{
        res.status(404).json({message: 'Не верно введены данные!'});
      });
};


export default {
  create,
};
