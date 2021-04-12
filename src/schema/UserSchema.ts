import { COLLECTION_USER } from '../config/Database';
import { model, Schema, Document } from 'mongoose';

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
    console.log('pre save user schema');
    next();
});

export default model<IUser>(COLLECTION_USER, UserSchema);
