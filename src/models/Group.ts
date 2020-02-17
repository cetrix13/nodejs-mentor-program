import { Model, DataTypes, BuildOptions } from 'sequelize';
import SequelizeInstance from '../config/connect';

export type GroupModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions);
}

const Group = <GroupModelStatic>SequelizeInstance.define('group', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    underscored: true
});

export default Group;