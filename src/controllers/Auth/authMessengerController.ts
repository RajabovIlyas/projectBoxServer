import {Request, Response} from 'express';

import {sendMessageData} from '../../core/app';
import {ISignUp} from './authType';
import {v4 as uuid} from 'uuid';
import {generateToken} from '../../utils/authHelper';
import User from '../../models/User';

const sendToken=async (signUpData: ISignUp, res: Response) => {
  console.log('ilyas', signUpData);
  await User.findOne({email: signUpData.email}).exec()
      .then(async (result)=>{
        if (result?.id) {
          await res.redirect(`${sendMessageData.urlProjectBox}/google/${generateToken(result.id)}`);
        } else {
          User.create({...signUpData, authorization: true})
              .then(async (result)=>{
                if (result?.id) {
                  await res.redirect(`${sendMessageData.urlProjectBox}/google/${generateToken(result.id)}`);
                } else {
                  throw 500;
                }
              }).catch((err)=> res.status(409).json({message: err.message, signUpData}));
        }
      })
      .catch((err)=> res.status(408).json({message: err.message, signUpData}));
};

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

  // @ts-ignore
  const email=req.user.emails[0].value;
  // @ts-ignore
  const fullName:{givenName:string, familyName:string}=req.user.name;

  const signUpData:ISignUp={
    surname: fullName.familyName,
    name: fullName.givenName,
    email: email,
    password: uuid(),
  };
  await sendToken(signUpData, res);
};

export default {authRedirect, authFacebook};
