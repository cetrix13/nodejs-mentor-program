const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Service_1 = __importDefault(require('./Service'));
class UserService extends Service_1.default {
    constructor(userModel) {
        super(userModel);
    }
    getAllUsers() {
        return this.getAll();
    }
    getUserById(id) {
        return this.getById(id);
    }
    createUser(user) {
        return this.create(user);
    }
    updateUser(id, fields) {
        return this.update(id, fields);
    }
}
exports.default = UserService;
// # sourceMappingURL=UserService.js.map
