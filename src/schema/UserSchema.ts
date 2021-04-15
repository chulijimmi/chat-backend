import { COLLECTION_USER } from '../config/Database';
import { model, Schema, Document } from 'mongoose';
import { debug } from '../utils/tools';

export interface IUser extends Document {
  userName: string;
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      index: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

UserSchema.pre('save', function (this: IUser, next) {
  debug('pre save user schema', this);
  next();
});

export default model<IUser>(COLLECTION_USER, UserSchema);
