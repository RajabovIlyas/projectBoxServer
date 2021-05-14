import {model, Schema, Document} from 'mongoose';
import {IUser, UserSchema} from './User';

export interface IProvider extends Document {
    _id?:string;
    nameCompany: string,
    fullName:string,
    position: string,
    companyDescription: string,
    bestProducts: string,
    siteCompany: string,
    phone: string,
    email: string,
}

export const ProviderSchema: Schema = new Schema({
  nameCompany: {type: String, required: true},
  fullName: {type: String, required: true},
  position: {type: String, required: true},
  companyDescription: {type: String, required: true},
  bestProducts: {type: String, required: true},
  siteCompany: {type: String, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true},
});

UserSchema.index({idUser: 1}, {unique: true});

export default model <IProvider>('Provider', ProviderSchema);
