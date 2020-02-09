var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const UserSchema_1 = require("./schemas/UserSchema");
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./controllers/UserController");
const app = express_1.default();
const router = express_1.default.Router();
const port = process.env.PORT;
const userController = new UserController_1.UserController();
router.route('/users')
    .get(userController.getAll())
    .post(helpers_1.validateSchema(UserSchema_1.createUserSchema), userController.create());
router.route('/users/:id')
    .get(userController.getById())
    .put(helpers_1.validateSchema(UserSchema_1.updateUserSchema), userController.update());
app.use(express_1.default.json());
app.use('/', router);
app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
//# sourceMappingURL=task_3.js.map