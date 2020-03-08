var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connect_1 = __importDefault(require("../config/connect"));
const Group = connect_1.default.define('group', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true
});
exports.default = Group;
//# sourceMappingURL=Group.js.map