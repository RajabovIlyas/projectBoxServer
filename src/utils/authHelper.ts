import {v4 as uuid} from 'uuid';
import jwt from 'jsonwebtoken';
import {secret, tokens} from '../core/app';
import {connect} from '../database';


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
  connect()
      .then((conn)=>{
        conn.query(`INSERT INTO token  (userId,tokenId) VALUES ('${userId}','${tokenId}')`);
      });
};

export const generateToken = async (userId: string) => {
  const tokenAll=generateAccessToken();
  await replaceDbToken(tokenAll.id, userId);
  return tokenAll.token;
};

export const findToken = async (tokenId:string) => {
  return connect()
      .then((conn)=>{
        return conn.query(`SELECT * FROM token WHERE tokenId='${tokenId}'`);
      });
};

export const removeToken = async (tokenId:string) => {
  return connect()
      .then((conn)=>{
        return conn.query(`DELETE FROM token WHERE  tokenId='${tokenId}'`);
      });
};
