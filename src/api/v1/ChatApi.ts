import express, { Request, Response, NextFunction, Router } from 'express';
import { RestCors } from '../../middleware/CorsMiddleware';
import JsonParser from '../../middleware/JsonParser';
import Logger from '../../middleware/Logger';

const router: Router = express();

// a middleware allow origin source
router.use(RestCors);
// a middleware logger apps
router.use(Logger);

router.get('/info', (req: Request, res: Response) => {
    console.log('request', req);
    res.send({ username: 'test' });
});

router.get('/user', (req: Request, res: Response) => {
    console.log('request', req);
    res.send({ username: 'admin' });
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use(
    '/user/:id',
    function (req: Request, res: Response, next: NextFunction) {
        console.log('Request URL:', req.originalUrl);
        next();
    },
    function (req: Request, res: Response, next: NextFunction) {
        console.log('Request Type:', req.method);
        next();
    },
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', JsonParser, function (req: Request, res: Response) {
    console.log('request', { body: req.body, params: req.params });
    res.send('hello, admin!');
});

export default router;
