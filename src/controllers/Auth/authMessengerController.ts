import {Request, Response} from 'express';

import {sendMessageData} from '../../core/app';
import {ISignUp} from './authType';
import {v4 as uuid} from 'uuid';
import {generateToken} from '../../utils/authHelper';
import User from '../../models/User';

const sendToken=async (signUpData: ISignUp, res: Response) => {
  await User.findOne({email: signUpData.email}).exec()
      .then(async (result)=>{
        if (result?.id) {
          await res.redirect(`${sendMessageData.urlProjectBox}/google/${await generateToken(result.id)}`);
        } else {
          // @ts-ignore
          User.create({...signUpData, authorization: true})
              .then(async (result)=>{
                if (result?.id) {
                  await res.redirect(`${sendMessageData.urlProjectBox}/google/${await generateToken(result.id)}`);
                } else {
                  throw 500;
                }
              }).catch((err)=> res.redirect(`${sendMessageData.urlProjectBox}`));
        }
      })
      .catch((err)=> res.redirect(`${sendMessageData.urlProjectBox}`));
};

const authGoogle = async (req: Request, res: Response) => {
  // @ts-ignore
  const email=req.user?.emails[0].value;
  // @ts-ignore
  const fullName:{name:string, surname:string}={surname: req.user?.name?.familyName, name: req.user?.name?.givenName};
  const signUpData:ISignUp={
    name: fullName.name,
    surname: fullName.surname,
    email: email,
    password: uuid(),
  };

  res.status(200).json(req.user);
  // await sendToken(signUpData, res);
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
  res.status(200).json(req.user);
  // await sendToken(signUpData, res);
};

export default {authGoogle, authFacebook};
