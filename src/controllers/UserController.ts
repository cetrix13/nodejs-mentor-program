import { Request, Response } from 'express';
import UserModel from '../models/User';
import UserDto from '../models/UserDto';
import UserService from '../services/UserService';

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService(UserModel);
    }
    getAll() {
        return async (_req: Request, res: Response) => {
            const users = await this.userService.getAllUsers();
            if (users && users.length) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req: Request, res: Response) => {
            const { id, login, password, age, isDeleted } = req.body;
            const user = new UserDto(id, login, password, age, isDeleted);
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
}
