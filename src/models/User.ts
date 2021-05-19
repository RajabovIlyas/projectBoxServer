import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    id?:string;
    name: string;
    surname: string;
    email:string;
    password:string;
    authorization:boolean;
    avatar:string;
}

export const UserSchema: Schema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  authorization: {type: Boolean, default: false},
  avatar: {type: String, default: 'https://projectbox-pro-server.herokuapp.com/uploads/default.jpg'},
});

UserSchema.index({email: 1}, {unique: true});

UserSchema.pre('save', function(next) {
  const user:any = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


export default model <IUser>('User', UserSchema);
