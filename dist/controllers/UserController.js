const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const UserService_1 = __importDefault(require('../services/UserService'));
const User_1 = __importDefault(require('../models/User'));
const UserDto_1 = __importDefault(require('../models/UserDto'));
class UserController {
    constructor() {
        this.userService = new UserService_1.default(User_1.default);
    }
    getAll() {
        return async (_req, res) => {
            const users = await this.userService.getAllUsers();
            if (users && users.length) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req, res) => {
            const { id, login, password, age, isDeleted } = req.body;
            const user = new UserDto_1.default(id, login, password, age, isDeleted);
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
            const user = await this.userService.getUserById(parseInt(id, 10));
            if (user && user.length) {
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
exports.UserController = UserController;
// # sourceMappingURL=UserController.js.map