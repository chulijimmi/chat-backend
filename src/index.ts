import { createServer } from 'http';
import { Server } from 'socket.io';
import express, { Application, Request, Response, NextFunction } from 'express';
import { SocketCors } from './middleware/CorsMiddleware';
import HelmetMiddleware from './middleware/HelmetMiddleware';
import favicon from 'serve-favicon';
import ChatApi from './api/v1/ChatApi';
import mongoose from 'mongoose';
import {
  MONGO_DB_ARG,
  MONGO_DB_DRIVER,
  MONGO_DB_HOST,
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USERNAME,
} from './config/Database';
import RoomNameSpace from './namespace/RoomNameSpace';

// Connection to mongodb
mongoose.connect(
  `${MONGO_DB_DRIVER}${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}${MONGO_DB_ARG}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: MONGO_DB_NAME,
  },
  () => {
    console.log('connect to database');
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to database error'));

// Boot express
const app: Application = express();
const port = process.env.PORT || 5000;

app.use(HelmetMiddleware);
app.use(favicon('favicon.png'));

// Rest Express Application
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (error) {
    console.log('error', error);
  }
});

app.use('/chat', ChatApi);

app.use('/', (req: Request, res: Response) => {
  res.status(500).send({ message: 'Method not found' });
});

// Socket Application
const httpServer = createServer(app);
const socketOptions = {
  cors: SocketCors,
};
const io = new Server(httpServer, socketOptions);
const nameSpaceRoom = io.of('/room');
const room = new RoomNameSpace(nameSpaceRoom);
room.init();

// Start server
httpServer.listen(port, () =>
  console.log(`Server is listening on port ${port}!`),
);
