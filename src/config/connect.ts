const Sequelize = require('sequelize');

const database = process.env.NODE_ENV === 'test'
    ? 'nodejs-test'
    : 'nodejs';

export default new Sequelize(database, 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

