import UserModel from '../models/User';
import Service from './Service';
import Bluebird from 'bluebird';
import { Model } from 'sequelize/types';

type SequelizerRecord = Bluebird<void | Model[]>;
export default class UserService extends Service {

    constructor(userModel: typeof UserModel) {
        super(userModel);
    }

    getAllUsers(): SequelizerRecord {
        return this.getAll();
    }

    getUserById(id: number) {
        return this.getById(id);
    }

    createUser(user) {
        return this.create(user);   
    }

    updateUser(id, fields) {
        return this.update(id, fields);
    }
}
