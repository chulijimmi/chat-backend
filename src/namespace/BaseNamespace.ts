import { Namespace } from 'socket.io';

class BaseNameSpace {
  server: Namespace;
  constructor(name: Namespace) {
    this.server = name;
    console.log('server', this.server);
  }

  /**
   * This function to handle when user disconnect
   * @returns {NameSpace} server object
   */
  public disconnect() {
    this.server.on('connection', (socket) => {
      socket.on('disconnect', (reason) => {
        console.log('BaseNamespace:disconnect room', {
          namespace: this.server.name,
          log: reason,
        });
        this.server.emit(`${this.server}:leave`, 'disconnect');
      });
    });
    return this.server;
  }

  /**
   * Create socket room based on userName and roomName
   * @param {string} userName
   * @param {string} roomName
   */
  public async createRoom(userName: string, roomName: string) {
    this.server.on('connection', async (socket) => {
      const payload = { userName, roomName };
      const join = await socket.join(roomName);
      console.log('BaseNamespace:createRoom', { payload, join, socket });
      return join;
    });
    return this.server;
  }
}

export default BaseNameSpace;
