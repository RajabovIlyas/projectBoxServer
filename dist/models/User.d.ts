import { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    id?: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    authorization: boolean;
}
export declare const UserSchema: Schema;
declare const _default: import("mongoose").Model<IUser, {}>;
export default _default;
