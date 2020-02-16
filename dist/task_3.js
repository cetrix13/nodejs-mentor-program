const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const helpers_1 = require('./helpers');
const UserSchema_1 = require('./schemas/UserSchema');
const GroupSchema_1 = require('./schemas/GroupSchema');
const express_1 = __importDefault(require('express'));
const UserController_1 = __importDefault(require('./controllers/UserController'));
const GroupController_1 = __importDefault(require('./controllers/GroupController'));
const CustomLogger_1 = __importDefault(require('./middleware/CustomLogger'));
const ErrorHandler_1 = __importDefault(require('./middleware/ErrorHandler'));
const app = express_1.default();
const router = express_1.default.Router();
const port = process.env.PORT;
const userController = new UserController_1.default();
const groupController = new GroupController_1.default();
router.route('/users')
    .get(userController.getAll())
    .post(helpers_1.validateSchema(UserSchema_1.createUserSchema), userController.create());
router.route('/users/:id')
    .get(userController.getById())
    .put(helpers_1.validateSchema(UserSchema_1.updateUserSchema), userController.update())
    .delete(userController.delete());
router.route('/groups')
    .get(groupController.getAll())
    .post(helpers_1.validateSchema(GroupSchema_1.createGroupSchema), groupController.create());
router.route('/groups/:id')
    .get(groupController.getById())
    .put(helpers_1.validateSchema(GroupSchema_1.updateGroupSchema), groupController.update())
    .delete(groupController.delete());
app.use(CustomLogger_1.default);
app.use(ErrorHandler_1.default);
app.use(express_1.default.json());
app.use('/', router);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
// # sourceMappingURL=task_3.js.map
