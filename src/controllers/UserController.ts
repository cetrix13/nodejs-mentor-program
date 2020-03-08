import { Request, Response } from 'express';
import UserModel from '../models/User';
import UserGroupModel from '../models/UserGroup';
import UserDto from '../models/UserDto';
import UserService from '../services/UserService';
import UserGroupService from '../services/UserGroupService';
import logger from '../loggers/Logger';

export default class UserController {
    private userService: UserService;
    private userGroupService: UserGroupService;

    constructor() {
        this.userService = new UserService(UserModel);
        this.userGroupService = new UserGroupService(UserGroupModel);
    }
    getAll() {
        return async (req: Request, res: Response) => {
            const { url, method } = req;

            const users = await this.userService.getAllUsers()
                .catch(err => { logger.error(err.message, { url, method }) });
            
            if (users !== null && users !== undefined) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req: Request, res: Response) => {
            const { body = {}, method, url } = req;
            const user = UserDto.createFromObject(body);
            const result = await this.userService.createUser(user)
                .catch(err => { logger.error(err.message, { url, method, body }) });

            if (result) {
                res.status(200).send(user);
            } else {
                res.sendStatus(500);
            }
        };
    }
    getById() {
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const { url, params, method } = req;

            const user = await this.userService.getUserById(parseInt(id, 10))
                .catch(err => { logger.error(err.message, { url, method, params })});

            if (user === undefined) {
                res.sendStatus(500);
            } else {
                if (user !== null) {
                    res.status(200).send(user);
                } else {
                    res.sendStatus(404);
                }
            }
        };
    }
    update() {
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const { url, params, method } = req;

            const result = await this.userService.updateUser(id, req.body)
                .catch(err => { logger.error(err.message, { url,  method, params }) });

            if (result) {
                res.status(200).send(result);
            } else {
                res.sendStatus(500);
            }
        };
    }
    delete() {
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const { url, params, method } = req;

            const result = await Promise.all([this.userService.deleteUser(id), this.userGroupService.deleteUser(id) ])
                .then(value => value)
                .catch(err => { logger.error(err.message, { url, method, params }) });

            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
