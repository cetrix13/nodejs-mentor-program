import { uniqueID } from '../helpers';

export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export default class Group {
    private id: number;
    private name: string;
    private permissions: Permissions;

    constructor(id, name, permissions) {
        this.id = id || uniqueID();
        this.name = name;
        this.permissions = permissions;
    }
}
