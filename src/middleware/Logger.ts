import { Request, Response, NextFunction } from 'express'
const Logger = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log('logger-middleware:', Date.now())
    next()
  } catch (error) {
    console.log('error', error)
  }
}

export default Logger
