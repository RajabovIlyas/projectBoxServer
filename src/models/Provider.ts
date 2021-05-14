import {model, Schema, Document} from 'mongoose';
import {IUser, UserSchema} from './User';

export interface IPartner extends Document {
    _id?:string;
    idUser:string|IUser;
    type:string;
    rating:number;
}

export const PartnerSchema: Schema = new Schema({
  type: {type: String, default: 'Partner'},
  rating: {type: Number, default: 1, min: 1},
});

UserSchema.index({idUser: 1}, {unique: true});

export default model <IPartner>('Partner', PartnerSchema);
