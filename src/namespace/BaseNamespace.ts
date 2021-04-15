import { Namespace } from 'socket.io';
import { debug } from '../utils/tools';

class BaseNameSpace {
  server: Namespace;
  constructor(name: Namespace) {
    this.server = name;
  }

  /**
   * This function to handle when user disconnect
   * @returns {NameSpace} server object
   */
  public disconnect() {
    this.server.on('connection', (socket) => {
      socket.on('disconnect', (reason) => {
        debug('BaseNamespace:disconnect room', {
          namespace: this.server.name,
          socket: socket.id,
          log: reason,
        });
        this.server.emit(`room:leave`, 'disconnect');
      });
    });
    return this.server;
  }
}

export default BaseNameSpace;
