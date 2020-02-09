import UserModel from '../models/User';

export default class UserService {
    private userModel: typeof UserModel;

    constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }
    getAllUsers() {
        return this.userModel.findAll({ where: { isDeleted: false } })
            .catch(err => console.error(err));
    }

    getUserById(id: number) {
        return this.userModel.findAll({ where: { id } })
            .catch(err => console.error(err));
    }

    createUser(user) {
        return this.userModel.create(user)
            .catch(err => console.error(err));
    }

    updateUser(id, fields) {
        return this.userModel.update(fields, { where: { id } })
            .catch(err => console.error(err));
    }
}
