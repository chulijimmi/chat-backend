import UserSchema from '../schema/UserSchema';
import RoomSchema from '../schema/RoomSchema';
import UserLogSchema from '../schema/UserLogSchema';

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
  console.log('data:findUserName', data);
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
  console.log('data:findRoomName', data);
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
  const docUser = { userName, createdAt: new Date() };
  const docRoom = { roomName, createdAt: new Date() };

  const isExistUser = await findUserName(docUser);
  const isExistRoom = await findRoomName(docRoom);

  if (isExistUser === false) {
    const user = new UserSchema(docUser);
    user.save(async function (err) {
      if (err) {
        console.log('RoomModel1:save:user', err);
      }
      if (isExistRoom === false) {
        const room = new RoomSchema(docRoom);
        room.save(function (err) {
          if (err) {
            console.log('RoomModel:save:room', err);
          }
          const docLog = {
            user: user._id,
            room: room._id,
            socketId: socketId,
            lastJoin: new Date(),
          };
          const log = new UserLogSchema(docLog);
          log.save(function (err) {
            console.log('RoomModel:save:log', err);
          });
        });
      } else {
        const docLog = {
          user: user._id,
          room: isExistRoom[0]._doc._id,
          socketId: socketId,
          lastJoin: new Date(),
        };
        const log = new UserLogSchema(docLog);
        log.save(function (err) {
          console.log('RoomModel:save:log', err);
        });
      }
    });
  } else {
    if (isExistRoom === false) {
      const room = new RoomSchema(docRoom);
      room.save(function (err) {
        if (err) {
          console.log('RoomModel:save:room', err);
        }
        const docLog = {
          user: isExistUser[0]._doc._id,
          room: room._id,
          socketId: socketId,
          lastJoin: new Date(),
        };
        const log = new UserLogSchema(docLog);
        log.save(function (err) {
          console.log('RoomModel:save:log', err);
        });
      });
    } else {
      const docLog = {
        user: isExistUser[0]._doc._id,
        room: isExistRoom[0]._doc._id,
        socketId: socketId,
        lastJoin: new Date(),
      };
      const log = new UserLogSchema(docLog);
      log.save(function (err) {
        console.log('RoomModel:save:log', err);
      });
    }
  }

  return { data: { userName, roomName, socketId } };
}
