import { Request } from 'express';
import { IUser } from '../../models/User';
export interface ISignUp {
    name: string | undefined;
    surname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}
export interface IAuthMe {
    id: string;
    name: string;
    surname: string;
    email: string;
}
export declare const getDataSignUp: (req: Request) => Promise<ISignUp | undefined>;
export declare const getAuthData: (user: IUser) => Promise<IAuthMe>;
