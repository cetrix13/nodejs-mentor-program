import { validateSchema } from './helpers';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';
import { createGroupSchema, updateGroupSchema } from './schemas/GroupSchema';
import express, { Application } from 'express';
import UserController from './controllers/UserController';
import GroupController from './controllers/GroupController';

const app: Application = express();
const router = express.Router();
const port = process.env.PORT;
const userController = new UserController();
const groupController = new GroupController();

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
    .delete(groupController.delete());


app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
