import User from '../models/User';

const express = require('express');
const app = express().use(express.json());
const users = [];

app.get('/users', (req, res) => {
    const { query: { id } } = req;
    const requestedUser = users.find(user => user.id === id);
    if (requestedUser) {
        res.send(requestedUser);
    } else {
        res.statusCode = 404;
    }
});

app.post('/users', (req, res) => {
    const { id, login, password, age, isDeleted } = req.body;
    const user = new User(id, login, password, age, isDeleted);
    users.push(user);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    res.json(user);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
