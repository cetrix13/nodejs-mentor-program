import UserGroupModel from '../models/UserGroup';
import Service from './Service';

export default class UserGroupService extends Service {

    constructor(userGroupModel: typeof UserGroupModel) {
        super(userGroupModel);
    }

    deleteGroup(groupId) {
        return this.model.destroy({ where: { group_id: groupId } })
            .catch(err => console.error(err));
    }
    deleteUser(userId) {
        return this.model.destroy({ where: { user_id: userId } })
            .catch(err => console.error(err));
    }
}
