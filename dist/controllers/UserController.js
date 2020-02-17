const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const User_1 = __importDefault(require('../models/User'));
const UserGroup_1 = __importDefault(require('../models/UserGroup'));
const UserDto_1 = __importDefault(require('../models/UserDto'));
const UserService_1 = __importDefault(require('../services/UserService'));
const UserGroupService_1 = __importDefault(require('../services/UserGroupService'));
class UserController {
    constructor() {
        this.userService = new UserService_1.default(User_1.default);
        this.userGroupService = new UserGroupService_1.default(UserGroup_1.default);
    }
    getAll() {
        return async (_req, res) => {
            const users = await this.userService.getAllUsers();
            if (users) {
                res.status(200).send(users);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req, res) => {
            const { body = {} } = req;
            const user = UserDto_1.default.createFromObject(body);
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
    delete() {
        return async (req, res) => {
            const { params: { id } } = req;
            const result = await Promise.all([this.userService.deleteUser(id), this.userGroupService.deleteUser(id)])
                .then(value => value);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
exports.default = UserController;
// # sourceMappingURL=UserController.js.map
