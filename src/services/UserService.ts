import UserModel from '../models/User';
import Service from './Service';

export default class UserService extends Service {

    constructor(userModel: typeof UserModel) {
        super(userModel);
    }

    getAllUsers() {
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

    deleteUser(id) {
        return this.model.update({ isDeleted: true }, { where: { id } })
    }
}
