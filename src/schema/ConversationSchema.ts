import {
  COLLECTION_ROOM,
  COLLECTION_USER,
  COLLECTION_CONVERSATION,
} from '../config/Database';
import { model, Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  user: Schema.Types.ObjectId;
  room: Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
}

const ConversationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_USER,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: COLLECTION_ROOM,
    },
    message: {
      type: String,
      index: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  },
);

ConversationSchema.pre('save', function (this: IConversation, next) {
  console.log('pre save conversation schema');
  next();
});

export default model<IConversation>(
  COLLECTION_CONVERSATION,
  ConversationSchema,
);
