import { DataTypes } from 'sequelize';
import SequelizeInstance from '../config/connect';

export async function createSchemaAndSeedDB() {
    const queryInterface = SequelizeInstance.getQueryInterface();

    await queryInterface.createTable(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            age: {
                type: DataTypes.SMALLINT
            },
            is_deleted: {
                type: DataTypes.BOOLEAN
            }
        }
    );

    await queryInterface.createTable(
        'groups',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            }
        }
    );

    await queryInterface.createTable(
        'user_group',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.SMALLINT
            },
            group_id: {
                type: DataTypes.SMALLINT
            }
        }
    );

    await queryInterface.bulkInsert('groups',
        [
            {
                id: 1,
                name: 'administrators',
                permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"]
            },
            {
                id: 2,
                name: 'users',
                permissions: ["READ", "WRITE"]
            }
        ]
    );

    await queryInterface.bulkInsert('user_group', 
    [
        {
            id: 1,
            user_id: 1,
            group_id: 1
        }, 
        {
            id: 2,
            user_id: 2,
            group_id: 1
        }, 
        {
            id: 3,
            user_id: 3,
            group_id: 2
        }, 
        {
            id: 4,
            user_id: 4,
            group_id: 2
        }
    ]
    );

    await queryInterface.bulkInsert('users',
        [
            {
                login: 'oleg-pronin',
                password: '123',
                age: 21,
                is_deleted: false,
            },
            {
                login: 'maxim-smirnov',
                password: 'abc',
                age: 26,
                is_deleted: false,
            },
            {
                login: 'anna-ivanova',
                password: 'abc123',
                age: 22,
                is_deleted: false,
            },
            {
                login: 'ivan-troshkin',
                password: '123abc',
                age: 30,
                is_deleted: false,
            },
        ]
    );
}


export async function dropTables() {
    const queryInterface = SequelizeInstance.getQueryInterface();
    await queryInterface.dropAllTables();
    await SequelizeInstance.close();
}

