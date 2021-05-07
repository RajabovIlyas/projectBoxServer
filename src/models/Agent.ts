import {model, Schema, Document} from 'mongoose';
import {IUser} from './User';

export interface IAgent extends Document {
    _id?:string;
    idUser:string|IUser;
    type:string;
    rating:number;
}

export const AgentSchema: Schema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  type: {type: String, default: 'Agent'},
  rating: {type: Number, default: 1, min: 1},
});

AgentSchema.index({idUser: 1}, {unique: true});


export default model <IAgent>('Agent', AgentSchema);
