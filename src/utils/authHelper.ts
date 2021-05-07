import {v4 as uuid} from 'uuid';
import jwt from 'jsonwebtoken';
import {secret, tokens} from '../core/app';
import Token from '../models/Token';


export const generateAccessToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.access.type,
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, secret),
  };
};

export const replaceDbToken = (tokenId:string, userId:string) => {
  Token.create({tokenId: tokenId, user: userId});
};

export const generateToken = async (userId: string) => {
  const tokenAll=generateAccessToken();
  await replaceDbToken(tokenAll.id, userId);
  return tokenAll.token;
};

export const findToken = async (tokenId:string) => {
  return Token.findOne({tokenId: tokenId});
};

export const removeToken = async (tokenId:string) => {
  return Token.findOneAndDelete({tokenId: tokenId});
};
