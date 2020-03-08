var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDto_1 = __importDefault(require("./models/UserDto"));
const helpers_1 = require("./helpers");
const express_1 = __importDefault(require("express"));
const UserSchema_1 = require("./schemas/UserSchema");
const app = express_1.default();
const router = express_1.default.Router();
const port = process.env.PORT;
const users = [];
router.route('/users')
    .get((_req, res) => {
    const activeUsers = users.filter(user => !user.isDeleted);
    res.status(200).send(activeUsers);
})
    .post(helpers_1.validateSchema(UserSchema_1.createUserSchema), (req, res) => {
    const { id, login, password, age, isDeleted } = req.body;
    const user = new UserDto_1.default(id, login, password, age, isDeleted);
    users.push(user);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(user);
});
router.route('/users/:id')
    .get((req, res) => {
    const { params: { id } } = req;
    const selectedUser = users.find(user => user.id === parseInt(id, 10));
    if (selectedUser) {
        res.status(200).send(selectedUser);
    }
    else {
        res.sendStatus(404);
    }
})
    .put(helpers_1.validateSchema(UserSchema_1.updateUserSchema), (req, res) => {
    const { params: { id } } = req;
    const index = users.findIndex(user => user.id === parseInt(id, 10));
    if (index !== -1) {
        users[index] = Object.assign(Object.assign({}, users[index]), req.body);
        res.status(200).send(users[index]);
    }
    else {
        res.sendStatus(404);
    }
});
app.use(express_1.default.json());
app.use('/', router);
app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
//# sourceMappingURL=task_2.js.map