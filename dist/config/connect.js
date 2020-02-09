Object.defineProperty(exports, '__esModule', { value: true });
const Sequelize = require('sequelize');
exports.default = new Sequelize('nodejs', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});
// # sourceMappingURL=connect.js.map
