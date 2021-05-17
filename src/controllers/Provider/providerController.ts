import {Request, Response} from 'express';
import {getDataProvider, getProviderType} from './providerType';
import Provider from '../../models/Provider';
import {sendMessageCompany} from '../../utils/sendMessage';


const create=async (req: Request, res: Response) => {
  const data:getProviderType | undefined=await getDataProvider(req);
  Provider.create(data)
      .then((result)=>{
        sendMessageCompany(result)
            .then((result) => {
              res.status(200).json({message: 'Данные сохранены успешно'});
            })
            .catch(async () => {
              await Provider.findByIdAndDelete(result.id);
              await res.status(500).json({message: 'Отправка рассылки не получилась!'});
            });
      })
      .catch((err)=>res.status(404).json({message: 'Не верно введены данные!'}));
};

export default {
  create,
};
