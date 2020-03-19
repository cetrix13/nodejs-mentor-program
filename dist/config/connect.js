Object.defineProperty(exports, '__esModule', { value: true });
const Sequelize = require('sequelize');
const database = process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_NAME
    : process.env.DB_MAIN_NAME;
exports.default = new Sequelize(database, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});
// # sourceMappingURL=connect.js.map
