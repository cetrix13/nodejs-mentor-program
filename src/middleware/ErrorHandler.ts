import { Request, Response } from 'express';

export default (_req: Request, res: Response, next) => {
    process.on('unhandledRejection', err => {
        console.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    process.on('uncaughtException', err => {
        console.error(`Error -- ${err} -- ${new Date().toUTCString()}`);
        res.sendStatus(500);
        process.exit(1);
    });
    next();
}