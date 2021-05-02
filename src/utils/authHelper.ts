import {v4 as uuid} from 'uuid';
const jwt = require('jsonwebtoken');
import Token, {IToken} from '../models/Token';
import {secret, tokens} from '../core/app';

export const generateAccessToken = (userId:string) => {
  const payload = {
    userId,
    type: tokens.access.type,
  };

  const options = {expiresIn: tokens.access.expiresIn};
  return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = () => {
  const payload = {
    id: uuid(),
    type: tokens.refresh.type,
  };
  const options = {expiresIn: tokens.refresh.expiresIn};
  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options),
  };
};

export const replaceDbRefreshToken = (tokenId:string, userId:string) => {
  Token.findOneAndDelete({userId})
      .exec()
      .then(() => {
        Token.create({tokenId, userId});
      })
      .catch(() => {
        Token.create({tokenId, userId});
      });
};

export const removeToken = async (tokenId:string) => {
  return await Token.findOneAndDelete({tokenId}).exec()
      .then((response) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
};

export const updateTokens = async (userId:string) => {
  const accessToken =await generateAccessToken(userId);
  const refreshToken =await generateRefreshToken();
  await replaceDbRefreshToken(refreshToken.id, userId);
  return {
    accessToken,
    refreshToken: refreshToken.token,
  };
};

export const findToken = (payload: {userId:string, tokenId:string}) => {
  return Token.findOne(payload)
      .then((result) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
};


