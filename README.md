# chat-backend

## Overview

chat-backend user socket.io library to process the websocket endpoint.

Development guide:
Before run this app, make sure that you already have env variables in your machine.
This env what we need:

- DEV_MONGODB_DRIVER=''
- DEV_MONGODB_USERNAME=''
- DEV_MONGODB_PASSWORD=''
- DEV_MONGODB_HOST=''
- DEV_MONGODB_ARG=''

## Table of Contents

- [Database](#database)
- [API](#api)
- [Test unit](#testunit)
- [Reference](#reference)

## Database

This backend use cloud mongodb, and we can setup our account https://www.mongodb.com/cloud/atlas.
After register and create the account, we can use tools such as mongo db compas to check our database server.
Other ways you can use another cloud services. If you not using connection driver or arg, please also change the code in index.ts (// Connection to mongodb)

## API

Example api can hit by IP_SERVER/chat/user/:username
The other api use socket in namespace 'room'

Join room can use endpoint room:join

## Reference

The reference context of this apps is including some idea when initialize the project

1. Typescript Language
   https://www.typescriptlang.org/docs/
2. Linting Code
   https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
3. Prettier Code
   https://prettier.io/docs/en/index.html
4. Development Watch Debugging Code
   https://github.com/remy/nodemon#nodemon
5. Test Code
   https://jestjs.io/docs/getting-started
6. Socket io
   https://socket.io/docs/v4
7. Source tutotials reference
   https://dev.to/ornio/node-js-express-with-typescript-eslint-jest-prettier-and-husky-part-1-1lin
   https://www.valentinog.com/blog/socket-react/
