import { validateSchema } from './helpers';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';
import express from 'express';
import { UserController } from './controllers/UserController';

const app = express();
const router = express.Router();
const port = process.env.PORT;
const userController = new UserController();

router.route('/users')
    .get(userController.getAll())
    .post(validateSchema(createUserSchema), userController.create());

router.route('/users/:id')
    .get(userController.getById())
    .put(validateSchema(updateUserSchema), userController.update());

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
