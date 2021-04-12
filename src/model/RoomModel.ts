import UserSchema from '../schema/UserSchema';

interface IUser {
    userName: string;
    createdAt: Date;
}

interface IRoom extends IUser {
    roomName: string;
    createdAt: Date;
}

/**
 * Find Username in database
 * @param doc IUser
 * @returns {Object}
 */
export async function findUserName(doc: IUser): Promise<any> {
    const data = await UserSchema.find({ userName: doc.userName }).exec();
    if (data?.length > Number(0)) {
        return { error: 407, message: 'This username already exist' };
    } else {
        return { error: 0, data };
    }
}

export async function JoinRoom(doc: IRoom): Promise<any> {
    // Check is the userName exist
    const isExist = await findUserName(doc);
    console.log('isExistUsername', isExist);
    if (isExist?.error) {
        return isExist;
    }
    // Check is the roomName exist

    // Create User & Room to database
    await UserSchema.create(doc);
    return doc;
}
