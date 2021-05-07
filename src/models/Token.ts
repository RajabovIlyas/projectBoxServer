import mongoose, {Schema, Document} from 'mongoose';
import {IUser} from './User';

export interface IToken extends Document {
    tokenId: string;
    userId: IUser;
}

const TokenSchema: Schema = new Schema({
  tokenId: {type: String, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export default mongoose.model <IToken>('Token', TokenSchema);
