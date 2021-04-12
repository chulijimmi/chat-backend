import { JoinRoom } from '../model/RoomModel';
import { Namespace } from 'socket.io';
import { preJoinSchema } from '../schema/JoiSchema';

function Room(server: Namespace): Namespace {
    const log: { id: string; user: string }[] = [];
    server.on('connection', (socket) => {
        socket.on('disconnect', (reason) => {
            console.log('user leave room', { reason, socket, log });
            server.emit('room:leave', 'disconnect');
        });
        socket.on('room:list', (callback) => {
            try {
                // console.log('room:list:arg1', arg1);
                // console.log('room:list:arg2', arg2);
                // Send response room list
                const data = [{ id: 1, name: 'roomA' }];
                callback(data);
            } catch (error) {
                console.log('error', error);
            }
        });

        socket.on('room:join', async (payload, callback) => {
            console.log('payload room:join', { payload, socket });
            try {
                if (typeof callback !== 'function') {
                    return socket.disconnect();
                }
                const { error, value } = preJoinSchema.validate(payload);
                if (error) {
                    const errMessage = { status: 201, error, value };
                    return callback(errMessage);
                }

                // Save username and room name
                const model = await JoinRoom(value); // [{ id: 1, userName: value.userName, roomName: value.roomName }];
                callback(model);

                // Create room
                socket.join(value.roomName);
                console.log('join_room', { socket });
                server.to('Jumping').emit('room:live', 'hi all in jumping');
                log.push({ id: socket.id, user: value.userName });
            } catch (error) {
                console.log('error_room:join');
                throw error;
            }
        });
    });
    return server;
}

export default Room;
