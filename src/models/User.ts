import { Model, DataTypes, BuildOptions } from 'sequelize';
import SequelizeInstance from '../config/connect';

export type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions);
}

const User = <UserModelStatic>SequelizeInstance.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true
});

export default User;