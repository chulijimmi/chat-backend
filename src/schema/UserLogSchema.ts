import {
  COLLECTION_ROOM,
  COLLECTION_USER,
  COLLECTION_USER_LOG,
} from '../config/Database';
import { model, Schema, Document } from 'mongoose';
import { debug } from '../utils/tools';

export interface IUserLog extends Document {
  user: Schema.Types.ObjectId;
  room: Schema.Types.ObjectId;
  socketId: string;
  lastJoin: Date;
}

const UserLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_USER,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_ROOM,
    },
    socketId: {
      type: String,
      index: true,
    },
    lastJoin: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

UserLogSchema.pre('save', function (this: IUserLog, next) {
  debug('pre save user log schema', this);
  next();
});

export default model<IUserLog>(COLLECTION_USER_LOG, UserLogSchema);
