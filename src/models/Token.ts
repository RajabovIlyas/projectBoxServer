import mongoose, {Schema, Document} from 'mongoose';

export interface IToken extends Document {
    tokenId: string;
    userId: string;
}

const TokenSchema: Schema = new Schema({
  tokenId: {type: String, required: true},
  userId: {type: String, required: true},
});

export default mongoose.model <IToken>('Token', TokenSchema);
