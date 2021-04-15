import { Namespace } from 'socket.io';

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
        console.log('BaseNamespace:disconnect room', {
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
