import {Request, Response} from 'express';

import {sendMessageData} from '../../core/app';
import {ISignInMessenger} from './authType';
import {v4 as uuid} from 'uuid';
import {generateToken} from '../../utils/authHelper';
import User from '../../models/User';

const sendToken=async (signUpData: ISignInMessenger, res: Response) => {
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
  const {email, picture, given_name, family_name}=req.user?._json;

  const signUpData:ISignInMessenger={
    surname: family_name,
    name: given_name,
    email: email,
    password: uuid(),
    avatar: picture,
  };


  await sendToken(signUpData, res);
};

const authFacebook = async (req: Request, res: Response) => {
  console.log('authFacebookGet', req.user);

  // @ts-ignore
  const {email, last_name, first_name, picture}=req.user._json;

  const avatar=picture?.data?.url;

  const signUpData:ISignInMessenger={
    surname: last_name,
    name: first_name,
    email: email,
    password: uuid(),
    avatar: avatar,
  };
  await sendToken(signUpData, res);
};

export default {authGoogle, authFacebook};
