import { validateSchema } from './helpers';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';
import { createGroupSchema, updateGroupSchema } from './schemas/GroupSchema';
import express, { Application } from 'express';
import UserController from './controllers/UserController';
import GroupController from './controllers/GroupController';
import customLogger from './middleware/CustomLogger';
import errorHandler from './middleware/ErrorHandler';
import AuthController from './controllers/AuthController';

const app: Application = express();
const router = express.Router();
const port = process.env.PORT;
const userController = new UserController();
const groupController = new GroupController();
const authController = new AuthController();

router.route('/users')
    .get(userController.getAll())
    .post(validateSchema(createUserSchema), userController.create());

router.route('/users/:id')
    .get(userController.getById())
    .put(validateSchema(updateUserSchema), userController.update())
    .delete(userController.delete());

router.route('/groups')
    .get(groupController.getAll())
    .post(validateSchema(createGroupSchema), groupController.create());

router.route('/groups/:id')
    .get(groupController.getById())
    .put(validateSchema(updateGroupSchema), groupController.update())
    .delete(groupController.delete())
    .post(groupController.addUsersToGroup());

router.route('/login')
    .post(authController.authenticate());


app.use(customLogger);
app.use(errorHandler);
app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
