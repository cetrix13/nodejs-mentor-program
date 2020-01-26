import Sequelize from 'sequelize';
import SequelizeInstance from '../../config/connect';

export default SequelizeInstance.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true
});
