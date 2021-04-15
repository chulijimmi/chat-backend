import { preJoinSchema } from '../schema/JoiSchema';
import { Namespace } from 'socket.io';
import BaseNameSpace from './BaseNamespace';
import {
  createConversation,
  createUserRoom,
  getConversation,
  getUserLogs,
  listRoom,
} from '../model/RoomModel';
import { debug } from '../utils/tools';

class RoomNameSpace extends BaseNameSpace {
  constructor(server: Namespace) {
    super(server);
    this.server = server;
  }

  /**
   * Return to socket io server object
   * @returns {NameSpace}
   */
  public listRoom() {
    this.server.on('connection', (socket) => {
      socket.on('room:list', async (callback) => {
        try {
          // Send response room list
          const data = await listRoom();
          callback(data);
        } catch (error) {
          debug('error', error);
        }
      });
    });
    return this.server;
  }

  /**
   * Return to socket io server object
   * This function is created user, room, userLog to mongodb related with JoinRoom model
   * After successfull create to database, we create room in socket.io conduct of our room services
   * @payload {Object}
   * @return {Namespace} server object
   */
  public joinRoom() {
    this.server.on('connection', (socket) => {
      socket.on('room:join', async (payload, callback) => {
        try {
          if (typeof callback !== 'function') {
            return socket.disconnect();
          }
          const { error, value } = preJoinSchema.validate(payload);
          if (error) {
            const errMessage = { status: 201, error, value };
            return callback(errMessage);
          }
          debug('socket:before:join', {
            server: this.server.name,
            socket: socket.id,
          });
          socket.join(value.roomName);
          const model = await createUserRoom(
            value.userName,
            value.roomName,
            socket.id,
          );
          this.server
            .to(`${value.roomName}`)
            .emit(
              `room:welcome`,
              `hi ${value.userName}, welcome to ${value.roomName} room`,
            );
          // await this.createRoom(value.userName, value.roomName);
          debug('socket:after:join', {
            server: this.server.name,
            socket: socket.id,
          });
          callback(model);
        } catch (error) {
          throw error;
        }
      });

      socket.on('room:join:logs', async (payload, callback) => {
        const response = await getUserLogs(payload.user.id, payload.room.id);
        callback(response);
      });
    });
    return this.server;
  }

  public conversation() {
    this.server.on('connection', (socket) => {
      socket.on('room:conversation', async (payload, callback) => {
        if (typeof callback !== 'function') {
          return socket.disconnect();
        }
        debug('payload:room:conversation', payload);
        await createConversation(
          payload.user.id,
          payload.room.id,
          payload.message,
        );
        const response = { from: payload.user.userName, says: payload.message };
        this.server
          .to(payload.room.roomName)
          .emit('room:conversation:typing', response);
        callback(response);
      });

      socket.on('room:conversation:all', async (payload, callback) => {
        const response = await getConversation(payload.room.id);
        callback(response);
      });
    });

    return this.server;
  }

  public init() {
    this.listRoom();
    this.joinRoom();
    this.conversation();
  }
}

export default RoomNameSpace;
