var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const UserGroup_1 = __importDefault(require("../models/UserGroup"));
const UserDto_1 = __importDefault(require("../models/UserDto"));
const UserService_1 = __importDefault(require("../services/UserService"));
const UserGroupService_1 = __importDefault(require("../services/UserGroupService"));
const Logger_1 = __importDefault(require("../loggers/Logger"));
class UserController {
    constructor() {
        this.userService = new UserService_1.default(User_1.default);
        this.userGroupService = new UserGroupService_1.default(UserGroup_1.default);
    }
    getAll() {
        return async (req, res) => {
            const { url, method } = req;
            const users = await this.userService.getAllUsers()
                .catch(err => { Logger_1.default.error(err.message, { url, method }); });
            if (users !== null && users !== undefined) {
                res.status(200).send(users);
            }
            else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req, res) => {
            const { body = {}, method, url } = req;
            const user = UserDto_1.default.createFromObject(body);
            const result = await this.userService.createUser(user)
                .catch(err => { Logger_1.default.error(err.message, { url, method, body }); });
            if (result) {
                res.status(200).send(user);
            }
            else {
                res.sendStatus(500);
            }
        };
    }
    getById() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method } = req;
            const user = await this.userService.getUserById(parseInt(id, 10))
                .catch(err => { Logger_1.default.error(err.message, { url, method, params }); });
            if (user === undefined) {
                res.sendStatus(500);
            }
            else {
                if (user !== null) {
                    res.status(200).send(user);
                }
                else {
                    res.sendStatus(404);
                }
            }
        };
    }
    update() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method } = req;
            const result = await this.userService.updateUser(id, req.body)
                .catch(err => { Logger_1.default.error(err.message, { url, method, params }); });
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.sendStatus(500);
            }
        };
    }
    delete() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method } = req;
            const result = await Promise.all([this.userService.deleteUser(id), this.userGroupService.deleteUser(id)])
                .then(value => value)
                .catch(err => { Logger_1.default.error(err.message, { url, method, params }); });
            if (result) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(500);
            }
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map