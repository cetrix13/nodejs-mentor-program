const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const connect_1 = __importDefault(require('../config/connect'));
const UserGroup = connect_1.default.define('userGroup', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    group_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'user_group'
});
exports.default = UserGroup;
// # sourceMappingURL=UserGroup.js.map
