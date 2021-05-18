import { Schema, Document } from 'mongoose';
export interface IProvider extends Document {
    _id?: string;
    nameCompany: string;
    fullName: string;
    position: string;
    companyDescription: string;
    bestProducts: string;
    siteCompany: string;
    phone: string;
    email: string;
}
export declare const ProviderSchema: Schema;
declare const _default: import("mongoose").Model<IProvider, {}>;
export default _default;
