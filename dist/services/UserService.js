Object.defineProperty(exports, '__esModule', { value: true });
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getAllUsers() {
        return this.userModel.findAll({ where: { isDeleted: false } })
            .catch(err => console.error(err));
    }
    getUserById(id) {
        return this.userModel.findAll({ where: { id } })
            .catch(err => console.error(err));
    }
    createUser(user) {
        return this.userModel.create(user)
            .catch(err => console.error(err));
    }
    updateUser(id, fields) {
        return this.userModel.update(fields, { where: { id } })
            .catch(err => console.error(err));
    }
}
exports.default = UserService;
// # sourceMappingURL=UserService.js.map
