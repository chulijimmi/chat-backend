import cors, { CorsOptionsDelegate } from 'cors';

const allowedOrigin = ['localhost:5000'];

const corsOptionResponse = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,POST',
    origin: '',
};

const options: CorsOptionsDelegate = (requestOrigin, callback) => {
    const host: string = requestOrigin.headers.host || '';
    const message = 'You have problem with CORS policy';
    if (allowedOrigin.indexOf(host) === -1) {
        corsOptionResponse.origin = host;
        callback(new Error(message), corsOptionResponse);
    } else {
        corsOptionResponse.origin = host;
        callback(null, corsOptionResponse);
    }
};

export const RestCors = cors(options);
export const SocketCors = {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
};
