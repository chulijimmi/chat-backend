import express, { Request, Response, NextFunction, Router } from 'express';
import { getLastLogin } from '../../model/RoomModel';
import { RestCors } from '../../middleware/CorsMiddleware';
import JsonParser from '../../middleware/JsonParser';
import Logger from '../../middleware/Logger';
import { debug } from '../../utils/tools';

const router: Router = express();

// a middleware allow origin source
router.use(RestCors);
// a middleware logger apps
router.use(Logger);

router.get('/user', (req: Request, res: Response) => {
  res.send({ status: 404 });
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:userName path
router.use(
  '/user/:userName',
  function (req: Request, res: Response, next: NextFunction) {
    debug('Request URL:', req.originalUrl);
    next();
  },
  function (req: Request, res: Response, next: NextFunction) {
    debug('Request Type:', req.method);
    next();
  },
);

// a middleware sub-stack that handles GET requests to the /user/:userName path
router.get(
  '/user/:userName',
  JsonParser,
  async function (req: Request, res: Response) {
    const response = await getLastLogin(req.params.userName);
    res.json(response);
  },
);

export default router;
