import { Schema, Document } from 'mongoose';
import { IUser } from './User';
export interface IPartner extends Document {
    _id?: string;
    user: string | IUser;
    rating: number;
}
export declare const PartnerSchema: Schema;
declare const _default: import("mongoose").Model<IPartner, {}>;
export default _default;
