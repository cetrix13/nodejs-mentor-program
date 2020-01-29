import UserService from '../services/UserService';
import express from 'express';
import UserModel from '../models/User';
import UserDto from '../models/UserDto';

export class UserController {
    constructor() {
        this.routes = express.Router();
        this.userService = new UserService(UserModel);
    }
    getAll() {
        return async (_req, res) => {
            const users = await this.userService.getAllUsers();
            if (users.length) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req, res) => {
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
        return async (req, res) => {
            const { params: { id } } = req;
            const user = await this.userService.getUserById(id);
            if (user.length) {
                res.status(200).send(user);
            } else {
                res.sendStatus(404);
            }
        };
    }
    update() {
        return async (req, res) => {
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
