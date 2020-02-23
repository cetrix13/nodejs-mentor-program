import { Request, Response } from 'express';
import UserModel from '../models/User';
import UserGroupModel from '../models/UserGroup';
import UserDto from '../models/UserDto';
import UserService from '../services/UserService';
import UserGroupService from '../services/UserGroupService';

export default class UserController {
    private userService: UserService;
    private userGroupService: UserGroupService;

    constructor() {
        this.userService = new UserService(UserModel);
        this.userGroupService = new UserGroupService(UserGroupModel);
    }
    getAll() {
        return async (_req: Request, res: Response) => {
            const users = await this.userService.getAllUsers();
            if (users !== null) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req: Request, res: Response) => {
            const { body = {} } = req;
            const user = UserDto.createFromObject(body);
            const result = await this.userService.createUser(user);
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
            const user = await this.userService.getUserById(parseInt(id, 10));
            if (user && user.length) {
                res.status(200).send(user);
            } else {
                res.sendStatus(404);
            }
        };
    }
    update() {
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const result = await this.userService.updateUser(id, req.body);
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
            const result = await Promise.all([this.userService.deleteUser(id), this.userGroupService.deleteUser(id) ])
                .then(value => value);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
