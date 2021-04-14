import dotenv from 'dotenv';

// Set development
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
  // console.log('development yes', process.env)
}

/**
 * Environment variables related to development, test, and production
 */
const Environment = {
  mongodb: {
    development: {
      driver: process.env.DEV_MONGODB_DRIVER,
      username: process.env.DEV_MONGODB_USERNAME,
      password: process.env.DEV_MONGODB_PASSWORD,
      host: process.env.DEV_MONGODB_HOST,
      arg: process.env.DEV_MONGODB_ARG,
    },
    test: {
      driver: process.env.TEST_MONGODB_DRIVER,
      username: process.env.TEST_MONGODB_USERNAME,
      password: process.env.TEST_MONGODB_PASSWORD,
      host: process.env.TEST_MONGODB_HOST,
      arg: process.env.TEST_MONGODB_ARG,
    },
    production: {
      driver: process.env.PROD_MONGODB_DRIVER,
      username: process.env.PROD_MONGODB_USERNAME,
      password: process.env.PROD_MONGODB_PASSWORD,
      host: process.env.PROD_MONGODB_HOST,
      arg: process.env.PROD_MONGODB_ARG,
    },
  },
};

export default Environment;
