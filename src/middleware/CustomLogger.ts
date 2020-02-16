import { Request, Response } from 'express';

export default (req: Request, _res: Response, next) => {
    const { url = '', method = '' } = req;
    console.log(`Logged ${method} ${url} -- ${new Date().toUTCString()}`);
    next();
}