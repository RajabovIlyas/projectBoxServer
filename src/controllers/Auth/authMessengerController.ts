import {Request, Response} from 'express';

import {sendMessageData} from '../../core/app';

const authGoogle = async (req: Request, res: Response) => {
  console.log('authGoogleGet', req.user);
  // @ts-ignore
  const token=req?.user?.token;
  if (token) {
    await res.redirect(`${sendMessageData.urlProjectBox}/google/${token}`);
    //  res.status(200).json(req.user);
  } else {
    res.status(500).json({message: 'Ошибка сервера'});
  }
};

const authFacebook = async (req: Request, res: Response) => {
  console.log('authFacebookGet', req.user);

  res.status(200).json(req.user);
  // // @ts-ignore
  // const token=req?.user?.token;
  // if (token) {
  //   await res.redirect(`${sendMessageData.urlProjectBox}/google/${token}`);
  //   //  res.status(200).json(req.user);
  // } else {
  //   res.status(500).json({message: 'Ошибка сервера'});
  // }
};

// const deleteAllToken = async (req: Request, res: Response) => {
//   Token.
//     res.status(500).json({message: 'Ошибка сервера'});
//
// };

export default {authGoogle, authFacebook};
