import { uniqueID } from '../helpers';

export default class User {
    constructor(id, login, password, age, isDeleted = false) {
        this.id = id || uniqueID();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}
