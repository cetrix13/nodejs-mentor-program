import { Request, Response } from 'express';
import logger from '../loggers/Logger';

export default (_req: Request, res: Response, next) => {
    process.on('unhandledRejection', err => {
        logger.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    process.on('uncaughtException', err => {
        logger.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    next();
}