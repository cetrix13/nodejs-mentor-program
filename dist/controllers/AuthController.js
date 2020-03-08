var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logger_1 = __importDefault(require("../loggers/Logger"));
class AuthController {
    authenticate() {
        return (req, res) => {
            const { url, method } = req;
            const { body: { username = '' } } = req;
            fs_1.default.readFile(constants_1.REGISTRED_USERS_REGISTRY, (err, data) => {
                if (err)
                    Logger_1.default.error(err.message, { url, method });
                const users = JSON.parse(data.toString());
                const foundUser = users.find(user => user.username === username);
                if (foundUser) {
                    const { id, username } = foundUser;
                    const payload = { id, username };
                    const token = jsonwebtoken_1.default.sign(payload, constants_1.SECRET_KEY);
                    res.status(200).send(token);
                }
                else {
                    res.status(401).send({
                        status: false,
                        message: 'Bad username provided'
                    });
                }
            });
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map