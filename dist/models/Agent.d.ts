import { Schema, Document } from 'mongoose';
import { IUser } from './User';
export interface IAgent extends Document {
    _id?: string;
    idUser: string | IUser;
    type: string;
    rating: number;
}
export declare const AgentSchema: Schema;
declare const _default: import("mongoose").Model<IAgent, {}>;
export default _default;
