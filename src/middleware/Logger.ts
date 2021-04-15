import { Request, Response, NextFunction } from 'express';
import { debug } from '../utils/tools';
const Logger = (req: Request, res: Response, next: NextFunction): void => {
  try {
    debug('logger-middleware:', Date.now());
    next();
  } catch (error) {
    debug('error', error);
  }
};

export default Logger;
