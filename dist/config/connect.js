Object.defineProperty(exports, '__esModule', { value: true });
const Sequelize = require('sequelize');
const database = process.env.NODE_ENV === 'test'
    ? 'nodejs-test'
    : 'nodejs';
exports.default = new Sequelize(database, 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
// # sourceMappingURL=connect.js.map
