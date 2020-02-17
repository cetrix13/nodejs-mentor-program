import { Model, DataTypes, BuildOptions } from 'sequelize';
import SequelizeInstance from '../config/connect';

export type UserGroupStatic = typeof Model & {
    new(values?: object, options?: BuildOptions);
}

const UserGroup = <UserGroupStatic>SequelizeInstance.define('userGroup', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'user_group',
});

export default UserGroup;