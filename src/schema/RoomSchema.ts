import { COLLECTION_ROOM } from '../config/Database';
import { model, Schema } from 'mongoose';
import { IUser } from '../schema/UserSchema';
import { debug } from '../utils/tools';

export interface IRoom extends IUser {
  roomName: string;
  createdAt: Date;
}

const RoomSchema = new Schema(
  {
    roomName: {
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

RoomSchema.pre('save', function (this: IRoom, next) {
  debug('pre save room schema', this);
  next();
});

export default model<IRoom>(COLLECTION_ROOM, RoomSchema);
