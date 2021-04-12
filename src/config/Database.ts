import Env from './Environtment';

/**
 * Define database connections
 */
export const MONGO_DB_DRIVER =
    Env.mongodb.production.driver || Env.mongodb.test.driver || Env.mongodb.development.driver;
export const MONGO_DB_USERNAME =
    Env.mongodb.production.username || Env.mongodb.test.username || Env.mongodb.development.username;
export const MONGO_DB_PASSWORD =
    Env.mongodb.production.password || Env.mongodb.test.password || Env.mongodb.development.password;
export const MONGO_DB_HOST = Env.mongodb.production.host || Env.mongodb.test.host || Env.mongodb.development.host;
export const MONGO_DB_ARG = Env.mongodb.production.arg || Env.mongodb.test.arg || Env.mongodb.development.arg;
export const MONGO_DB_NAME = 'chat';

/**
 * Define the collection name
 */
export const COLLECTION_USER = 'user';
export const COLLECTION_ROOM = 'root';
export const COLLECTION_CONVERSATION = 'conversation';
