import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constants';

export default (req: Request, res: Response, next) => {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).send({ status: false, message: 'No token provided' });
    }
    return jwt.verify(token, SECRET_KEY, function (err) {
        if (err) {
            res.status(403).send({ status: false, message: 'Failed to authenticate token'});
        }
        next();
    });
}