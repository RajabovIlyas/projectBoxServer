import mongoose, { Document } from 'mongoose';
export interface IToken extends Document {
    tokenId: string;
    user: string;
}
declare const _default: mongoose.Model<IToken, {}>;
export default _default;
