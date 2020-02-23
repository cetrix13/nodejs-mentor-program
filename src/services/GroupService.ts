import GroupModel from '../models/Group';
import Service from './Service';
import logger from '../loggers/Logger';

export default class GroupService extends Service {
    protected model;
    
    constructor(groupModel: typeof GroupModel) {
        super(groupModel);
    }

    getAllGroups() {
        return this.model.findAll()
            .catch(err => logger.error(err.message));
    }

    getGroupById(id: number) {
        return this.getById(id);
    }

    createGroup(group) {
        return this.create(group);
    }

    updateGroup(id, fields) {
        return this.update(id, fields);
    }

    deleteGroup(id) {
        return this.delete(id);
    }
}
