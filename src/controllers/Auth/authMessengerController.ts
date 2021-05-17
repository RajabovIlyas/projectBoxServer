import {Request, Response} from 'express';

import {sendMessageData} from '../../core/app';
import {ISignUp} from './authType';
import {v4 as uuid} from 'uuid';

const authRedirect = async (req: Request, res: Response) => {
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

  // // @ts-ignore
  // const email=req.user.email[0].value;
  // // @ts-ignore
  // const surname=req.user?.name?.familyName;
  // // @ts-ignore
  // const name=req.user?.name?.givenName;
  // const signUpData:ISignUp={
  //   surname: surname,
  //   name: name,
  //   email: email,
  //   password: uuid(),
  // };

  res.status(200).json(req.user);
};

export default {authRedirect, authFacebook};
