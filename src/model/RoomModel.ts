import UserSchema from '../schema/UserSchema';
import RoomSchema from '../schema/RoomSchema';

type IUser = {
  userName: string;
  createdAt: Date;
};

/**
 * Find Username in database
 * @param {IUser} doc
 * @returns {Object}
 */
export async function findUserName(doc: IUser): Promise<any> {
  const data = await UserSchema.find({ userName: doc.userName }).exec();
  if (data?.length > Number(0)) {
    return { error: 412, message: 'This username already exist' };
  } else {
    return data;
  }
}

type IRoom = {
  roomName: string;
  createdAt: Date;
};

/**
 *
 * @param doc
 */
export async function findRoomName(doc: IRoom): Promise<any> {
  const data = await RoomSchema.find({ roomName: doc.roomName }).exec();
  if (data?.length > Number(0)) {
    return { error: 412, message: 'This room name already exist' };
  }
  return data;
}

/**
 * Create user, room, and user_logs due to give another service in room
 * such as notificatioin, information to other user, etc.
 * @param {IRoom} doc
 * @returns {Object} results of document
 */
export async function createUserRoom(
  userName: string,
  roomName: string,
): Promise<any> {
  const docUser = { userName, createdAt: new Date() };
  const docRoom = { roomName, createdAt: new Date() };

  const isExistUser = await findUserName(docUser);
  console.log('RoomModel:checkUserName', isExistUser);
  if (isExistUser?.error) {
    return isExistUser;
  }

  const isExistRoom = await findRoomName(docRoom);
  console.log('RoomModel:checkRoomName', isExistRoom);
  if (isExistRoom.error) {
    return isExistRoom;
  }

  const createUser = await UserSchema.create(docUser);
  const createRoom = await RoomSchema.create(docRoom);
  console.log('RoomModel:createUserRoom', { createUser, createRoom });
  return { data: { user: docUser, room: docRoom } };
}
