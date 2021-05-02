import {Request} from 'express';

export interface ISignUp {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

export const getDataSignUp = async (req: Request): Promise<ISignUp> => {
  return {name: req.body.name, surname: req.body.surname, email: req.body.email, password: req.body.password};
};
