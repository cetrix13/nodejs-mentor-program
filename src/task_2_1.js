import User from '../models/User';

const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT;
const users = [];

router.route('/users/:id')
    .get((req, res) => {
        const { params: { id } } = req;
        const user = users.find(user => user.id === id);
        if (user) {
            res.send(user);
        } else {
            res.statusCode = 404;
            res.end();
        }
    })
    .post((req,res) => {
        const { id, login, password, age, isDeleted } = req.body;
        const user = new User(id, login, password, age, isDeleted);
        users.push(user);

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        res.send(user);
    })
    .put((req, res) => {
        const { params: { id } } = req;
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users[index] = { ...users[index], ...req.body };
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(users[index]);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });

app.use(express.json());
app.use('/', router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
