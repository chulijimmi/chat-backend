import { preJoinSchema } from '../schema/JoiSchema';
import { Namespace } from 'socket.io';
import BaseNameSpace from './BaseNamespace';
import { createUserRoom } from '../model/RoomModel';

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
      socket.on('room:list', (callback) => {
        try {
          // Send response room list
          const data = [{ id: 1, name: 'roomA' }];
          callback(data);
        } catch (error) {
          console.log('error', error);
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
          socket.join(value.roomName);
          console.log('RoomNameSpace:createRoom', { payload, socket });
          const model = await createUserRoom(value.userName, value.roomName);
          callback(model);
        } catch (error) {
          throw error;
        }
      });
    });
    return this.server;
  }

  public init() {
    this.listRoom();
    this.joinRoom();
  }
}

export default RoomNameSpace;
