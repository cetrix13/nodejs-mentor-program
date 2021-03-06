import { uniqueID } from '../helpers';

export default class User {
    public id: number;
    private login: string;
    private password: string;
    private age: number;
    public isDeleted: boolean;

    static createFromObject({ id, login, password, age, isDeleted }) {
        return new User(id, login, password, age, isDeleted);
    }

    constructor(id: number, login: string, password: string, age: number, isDeleted = false) {
        this.id = id || uniqueID();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = isDeleted;
    }
}
