import { uniqueID } from '../src/helpers';

export default class User {
    constructor(id, login, password, age, isDeleted = false) {
        this.id = id || uniqueID().toString();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}
