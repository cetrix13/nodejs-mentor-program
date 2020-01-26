import UserDto from './models/UserDto';
import { validateSchema } from './helpers';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';
import express from 'express';
import UserService from './services/UserService';
import UserModel from './models/User';

const app = express();
const router = express.Router();
const port = process.env.PORT;
const userService = new UserService(UserModel);

router.route('/users')
    .get(async (_req, res) => {
        const users = await userService.getAllUsers();
        if (users.length) {
            res.status(200).send(users);
        } else {
            res.sendStatus(502);
        }
    })
    .post(validateSchema(createUserSchema), async (req, res) => {
        const { id, login, password, age, isDeleted } = req.body;
        const user = new UserDto(id, login, password, age, isDeleted);
        const result = await userService.createUser(user);
        if (result) {
            res.status(200).send(user);
        } else {
            res.sendStatus(502);
        }
    });


router.route('/users/:id')
    .get(async (req, res) => {
        const { params: { id } } = req;
        const user = await userService.getUserById(id);
        if (user.length) {
            res.status(200).send(user);
        } else {
            res.sendStatus(404);
        }
    })
    .put(validateSchema(updateUserSchema), async (req, res) => {
        const { params: { id } } = req;
        const result = await userService.updateUser(id, req.body);
        if (result) {
            res.status(200).send(result);
        } else {
            res.sendStatus(502);
        }
    });

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
