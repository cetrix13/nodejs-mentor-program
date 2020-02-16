const Sequelize = require('sequelize');

export default new Sequelize('nodejs', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

