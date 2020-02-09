import UserDto from './models/UserDto';
import { validateSchema } from './helpers';
import express from 'express';
import { createUserSchema, updateUserSchema } from './schemas/UserSchema';

const app = express();
const router = express.Router();
const port = process.env.PORT;
const users: UserDto[] = [];

router.route('/users')
    .get((_req, res) => {
        const activeUsers = users.filter(user => !user.isDeleted);
        res.status(200).send(activeUsers);
    })
    .post(validateSchema(createUserSchema), (req, res) => {
        const { id, login, password, age, isDeleted } = req.body;
        const user = new UserDto(id, login, password, age, isDeleted);
        users.push(user);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(user);
    })


router.route('/users/:id')
    .get((req, res) => {
        const { params: { id } } = req;
        const selectedUser = users.find(user => user.id === parseInt(id, 10));
        if (selectedUser) {
            res.status(200).send(selectedUser);
        } else {
            res.sendStatus(404);
        }
    })

    .put(validateSchema(updateUserSchema), (req, res) => {
        const { params: { id } } = req;
        const index = users.findIndex(user => user.id === parseInt(id, 10));

        if (index !== -1) {
            users[index] = { ...users[index], ...req.body };
            res.status(200).send(users[index]);
        } else {
            res.sendStatus(404);
        }
    });

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
