import GroupModel from '../models/Group';
import Service from './Service';
import Bluebird from 'bluebird';
import { Model } from 'sequelize/types';

type SequelizerRecord = Bluebird<void | Model[]>;
export default class GroupService extends Service {

    constructor(groupModel: typeof GroupModel) {
        super(groupModel);
    }

    getAllGroups() {
        return this.model.findAll()
            .catch(err => console.error(err));
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
