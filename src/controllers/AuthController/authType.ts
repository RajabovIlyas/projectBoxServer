import {Request} from 'express';
import bcrypt from 'bcryptjs';
import {v4 as uuid} from 'uuid';

export interface ISignUp {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export const getDataSignUp = async (req: Request): Promise<ISignUp|undefined> => {
  return {name: req.body.name, surname: req.body.surname, email: req.body.email, password: req.body.password};
};
