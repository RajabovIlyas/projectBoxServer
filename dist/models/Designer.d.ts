import { Schema, Document } from 'mongoose';
import { IUser } from './User';
export interface IDesigner extends Document {
    _id?: string;
    user: string | IUser;
    rating: number;
}
export declare const DesignerSchema: Schema;
declare const _default: import("mongoose").Model<IDesigner, {}>;
export default _default;
