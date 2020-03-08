Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
class User {
    constructor(id, login, password, age, isDeleted = false) {
        this.id = id || helpers_1.uniqueID();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
    static createFromObject({ id, login, password, age, isDeleted }) {
        return new User(id, login, password, age, isDeleted);
    }
}
exports.default = User;
//# sourceMappingURL=UserDto.js.map