import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import SequelizeInstance from '../config/connect';

interface UserModel extends Model {
    readonly id: number;
}

type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
}

const User = <UserModelStatic>SequelizeInstance.define('user', {
    id: {
        type: DataTypes.INTEGER,
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