import 'dotenv/config';
import { validateSchema, showMainPage } from './helpers';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';
import { createGroupSchema, updateGroupSchema } from './schemas/GroupSchema';
import express, { Application } from 'express';
import UserController from './controllers/UserController';
import GroupController from './controllers/GroupController';
import AuthController from './controllers/AuthController';
import customLogger from './middleware/CustomLogger';
import errorHandler from './middleware/ErrorHandler';
import checkToken from './middleware/CheckToken';
import cors from 'cors';

const app: Application = express();
const router = express.Router();
const env = process.env.NODE_ENV;
const userController = new UserController();
const groupController = new GroupController();
const authController = new AuthController();
const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors())

router.route('/')
    .get(showMainPage());

router.route('/users')
    .all(checkToken)
    .get(userController.getAll())
    .post(validateSchema(createUserSchema), userController.create());

router.route('/users/:id')
    .all(checkToken)
    .get(userController.getById())
    .put(validateSchema(updateUserSchema), userController.update())
    .delete(userController.delete());

router.route('/groups')
    .all(checkToken)
    .get(groupController.getAll())
    .post(validateSchema(createGroupSchema), groupController.create());

router.route('/groups/:id')
    .all(checkToken)
    .get(groupController.getById())
    .put(validateSchema(updateGroupSchema), groupController.update())
    .delete(groupController.delete())
    .post(groupController.addUsersToGroup());

router.route('/login')
    .post(authController.authenticate());

if (env !== 'test') {
    app.use(customLogger);
    app.use(errorHandler);
}
app.use(express.json());
app.use('/', router);

export default app;
