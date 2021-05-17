import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './User';

export interface IToken extends Document {
    tokenId: string;
    user: string;
}

const TokenSchema: Schema = new Schema({
  tokenId: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});


export default mongoose.model <IToken>('Token', TokenSchema);
