import {Request} from 'express';
import bcrypt from 'bcryptjs';
import {v4 as uuid} from 'uuid';

export interface ISignUp {
    id:string;
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export const getDataSignUp = async (req: Request): Promise<ISignUp|undefined> => {
  if (!req.body.password) {
    return undefined;
  }
  return {id: uuid(), name: req.body.name, surname: req.body.surname, email: req.body.email, password: bcrypt.hashSync(req.body.password)};
};
