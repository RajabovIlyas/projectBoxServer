import {Request, Response} from 'express';
import multer from 'multer';
import {v1 as uuid} from 'uuid';
import User from '../../models/User';
import fs from 'fs';


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const codeName = file.originalname.split('.');
    const name = uuid() + '.' + codeName[codeName.length - 1];
    cb(null, name);
  },
});

const fileFilter = (req:Request, file:any, cb:any) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10240 * 10240 * 5,
  },
  fileFilter: fileFilter,
});

const changeAvatar=async (req: Request, res: Response) => {
  if (!req.file?.filename) {
    res.status(404).json({message: 'Фото не было найдено'});
    return;
  }
  await User.findById(req.userId).exec()
      .then(async (result)=>{
        if (result?.avatar&& result?.avatar.indexOf('/default.jpg')===-1) {
          const oldPath=result.avatar.split('/');
          const fileNameWithPath = 'uploads/' + oldPath[oldPath.length-1];
          if (fs.existsSync(fileNameWithPath)) {
            fs.unlink(fileNameWithPath, ((err) => {}));
          }
        }
        User.findByIdAndUpdate(req.userId, {avatar: 'https://projectbox-pro-server.herokuapp.com/uploads/'+ req.file.filename}).exec()
            .then((result)=>{
              res.status(200).json({message: 'Изменение прошли успешно'});
            })
            .catch((err)=> res.status(500).json({message: 'Ошибка в сохранении данных'}));
      });
};


export default {
  changeAvatar,
};
