import User from '../models/User';
import { validateSchema } from './helpers';

const express = require('express');
const Joi = require('@hapi/joi');
const app = express();
const router = express.Router();
const port = process.env.PORT;
const users = [];

const schema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

router.route('/users/:id')
    .get((req, res) => {
        const { params: { id } } = req;
        const user = users.find(user => user.id === id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).end();
        }
    })
    .post(validateSchema(schema),(req,res) => {
        const { id, login, password, age, isDeleted } = req.body;
        const user = new User(id, login, password, age, isDeleted);
        users.push(user);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(user);
    })
    .put(validateSchema(schema), (req, res) => {
        const { params: { id } } = req;
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users[index] = { ...users[index], ...req.body };
            res.status(200).json(users[index]);
        } else {
            res.status(404).end();
        }
    });

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}/users`));
