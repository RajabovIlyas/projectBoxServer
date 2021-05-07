import {Request} from 'express';
import bcrypt from 'bcryptjs';
import {v4 as uuid} from 'uuid';
import {IUser} from '../../models/User';

export interface ISignUp {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export interface IAuthMe {
    id:string;
    name: string;
    surname: string;
    email: string;
}

export const getDataSignUp = async (req: Request): Promise<ISignUp|undefined> => {
  return {name: req.body.name, surname: req.body.surname, email: req.body.email, password: req.body.password};
};

export const getAuthData= async (user:IUser): Promise<IAuthMe>=>{
  return {id: user._id, name: user.name, surname: user.surname, email: user.email};
};
