import {model, Schema, Document} from 'mongoose';
import {IUser, UserSchema} from './User';

export interface IPartner extends Document {
    _id?:string;
    user:string|IUser;
    rating:number;
}

export const PartnerSchema: Schema = new Schema({
  idUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  rating: {type: Number, default: 1, min: 1},
});

UserSchema.index({idUser: 1}, {unique: true});

export default model <IPartner>('Partner', PartnerSchema);
