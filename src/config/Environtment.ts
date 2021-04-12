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
    serverPort: {
        development: process.env.DEV_SERVER_PORT,
        test: process.env.TEST_SERVER_PORT,
        production: process.env.PROD_SERVER_PORT,
    },
};

export default Environment;
