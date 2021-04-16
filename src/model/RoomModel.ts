import UserSchema from '../schema/UserSchema';
import RoomSchema from '../schema/RoomSchema';
import UserLogSchema from '../schema/UserLogSchema';
import ConversationSchema from '../schema/ConversationSchema';
import _ from 'lodash';
import { debug } from '../utils/tools';

type IUser = {
  userName: string;
  createdAt: Date;
};

/**
 * Find username in database
 * @param {IUser} doc
 * @returns {Object}
 */
export async function findUserName(doc: IUser): Promise<any> {
  const data = await UserSchema.find({ userName: doc.userName }).exec();
  debug('data:findUserName', data);
  if (data?.length > Number(0)) {
    return data;
  }
  return false;
}

type IRoom = {
  roomName: string;
  createdAt: Date;
};

/**
 * Find room name in database
 * @param doc
 */
export async function findRoomName(doc: IRoom): Promise<any> {
  const data = await RoomSchema.find({ roomName: doc.roomName }).exec();
  debug('data:findRoomName', data);
  if (data?.length > Number(0)) {
    return data;
  }
  return false;
}

export async function listRoom() {
  const data = await RoomSchema.find();
  return data;
}

/**
 * Create user and room if data not exist
 * Create user_logs due to give another service in room
 * such as notificatioin, information to other user, etc.
 * @param {String} userName
 * @param {String} roomName
 * @param {String} socketId
 * @returns {Object} payload
 */
export async function createUserRoom(
  userName: string,
  roomName: string,
  socketId: string,
): Promise<any> {
  let response = {
    user: {
      userName: userName,
      id: '',
    },
    room: {
      roomName: roomName,
      id: '',
    },
    socketId: socketId,
  };
  const docUser = { userName, createdAt: new Date() };
  const docRoom = { roomName, createdAt: new Date() };

  const isExistUser = await findUserName(docUser);
  const isExistRoom = await findRoomName(docRoom);
  console.log('check', { isExistUser, isExistRoom });

  if (isExistUser === false) {
    const user = new UserSchema(docUser);
    await user.save();
    const room = new RoomSchema(docRoom);
    if (isExistRoom === false) {
      await room.save();
    }
    const docLog = {
      user: user._id,
      room: room._id,
      socketId: socketId,
      lastJoin: new Date(),
    };
    const log = new UserLogSchema(docLog);
    await log.save();
    response.user.id = user._id.toString();
    response.room.id = room._id.toString();
  } else if (isExistRoom === false) {
    const user = isExistUser[0];
    const room = new RoomSchema(docRoom);
    await room.save();
    const docLog = {
      user: user._id,
      room: room._id,
      socketId: socketId,
      lastJoin: new Date(),
    };
    const log = new UserLogSchema(docLog);
    await log.save();
    response.user.id = user._id.toString();
    response.room.id = room._id.toString();
  } else {
    const user = isExistUser[0];
    const room = isExistRoom[0];
    const docLog = {
      user: user._id,
      room: room._id,
      socketId: socketId,
      lastJoin: new Date(),
    };
    const log = new UserLogSchema(docLog);
    response.user.id = user._id.toString();
    response.room.id = room._id.toString();
    await log.save();
  }
  return { data: response };
}

/**
 * Create conversation to persist in database
 * @param {string} userId
 * @param {string} roomId
 * @param {string} message
 * @return {void}
 */
export async function createConversation(
  userId: string,
  roomId: string,
  message: string,
): Promise<any> {
  const doc = {
    user: userId,
    room: roomId,
    message,
    createdAt: new Date(),
  };

  const conversation = new ConversationSchema(doc);
  conversation.save((err) => {
    debug('error:conversation:save', err);
  });
}

type IConversation = {
  id: string;
  message: string;
  createdAt: Date;
  room: any;
  user: any;
};

/**
 * Retreive conversation in room.
 * This model provide to client side in start up the app
 * @param roomId
 * @returns {Array}
 */
export async function getConversation(roomId: string) {
  let response: IConversation[] = [];
  const model = await ConversationSchema.find()
    .populate({
      path: 'room',
      match: { _id: { $eq: roomId } },
    })
    .populate('user')
    .sort({ createdAt: 'asc' })
    .exec();
  model.forEach((item, index) => {
    response[index] = {
      id: item.id,
      message: item.message,
      createdAt: item.createdAt,
      room: item.room,
      user: item.user,
    };
  });
  return response;
}

/**
 * Get user logs data to check the latest user join
 * @param userId
 * @param roomId
 * @returns {Array}
 */
export async function getUserLogs(userId: string, roomId: string) {
  const model = await UserLogSchema.find()
    .populate({
      path: 'room',
      match: { _id: { $eq: roomId } },
    })
    .populate({
      path: 'user',
      match: { _id: { $ne: userId } },
    })
    .sort({ createdAt: 'desc' })
    .exec();
  const newModel = _.uniqBy(model, (e) => {
    return e.user;
  });
  return newModel.filter((i) => i.user !== null && i.room !== null);
}

/**
 * Get last login by user username
 * @param userName
 * @returns {Array}
 */
export async function getLastLogin(userName: string) {
  const model = await UserLogSchema.find()
    .populate({
      path: 'room',
    })
    .populate({
      path: 'user',
      match: { userName: { $eq: userName } },
    })
    .sort({ createdAt: 'desc' })
    .exec();
  return model.filter((i) => i.user !== null);
}
