import {model, Schema, Document} from 'mongoose';
import {IUser, UserSchema} from './User';

export interface IDesigner extends Document {
    _id?:string;
    idUser:string|IUser;
    type:string;
    rating:number;
}

export const DesignerSchema: Schema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  type: {type: String, default: 'Designer'},
  rating: {type: Number, default: 1, min: 1},
});

UserSchema.index({idUser: 1}, {unique: true});

export default model <IDesigner>('Designer', DesignerSchema);
