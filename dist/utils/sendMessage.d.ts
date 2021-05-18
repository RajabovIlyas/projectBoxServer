import { IUser } from '../models/User';
import { IProvider } from '../models/Provider';
import { ICourse } from '../models/Course';
export declare const sendMessage: (user: IUser) => Promise<any>;
export declare const sendMessageCompany: (provider: IProvider) => Promise<any>;
export declare const sendMessageCourses: (course: ICourse) => Promise<any>;
