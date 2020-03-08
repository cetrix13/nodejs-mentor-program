import { Request, Response } from 'express';
import fs from 'fs';
import { REGISTRED_USERS_REGISTRY, SECRET_KEY } from '../constants';
import jwt from 'jsonwebtoken';
import logger from '../loggers/Logger';

export default class AuthController {
    authenticate() {
        return (req: Request, res: Response) => {
            const { url, method } = req;
            const { body: { username } } = req;

            fs.readFile(REGISTRED_USERS_REGISTRY, (err, data) => {
                if (err) logger.error(err.message, { url, method });

                const users = JSON.parse(data.toString());
                const foundUser = users.find(user => user.username === username);

                if (foundUser) {
                    const { id, username } = foundUser;
                    const payload = { id, username }
                    const token = jwt.sign(payload, SECRET_KEY);
                    res.status(200).send(token);
                } else {
                    res.status(401).send({
                        status: false,
                        message: 'Bad username provided'
                    });
                }
            });
        }
    }
}