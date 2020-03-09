import UserGroupModel from '../models/UserGroup';
import Service from './Service';
import SequelizeInstance from '../config/connect';

export default class UserGroupService extends Service {

    constructor(userGroupModel: typeof UserGroupModel) {
        super(userGroupModel);
    }

    deleteGroup(groupId) {
        return this.model.destroy({ where: { group_id: groupId } })
    }
    deleteUser(userId) {
        return this.model.destroy({ where: { user_id: userId } })
    }

    async addUsersToGroup(groupId, userIds) {
        let transactionsArray = [];
        try {
            for (let i = 0; i < userIds.length; i++) {
                const t = await SequelizeInstance.transaction();
                transactionsArray.push(t);
                await this.model.create({ group_id: groupId, user_id: userIds[i] }, { transaction: t });
                await t.commit();
            }
        } catch (error) {
            transactionsArray.forEach(async function(transaction) { await transaction.rollback() });
            throw new Error(error);
        }
        return 1;
    }
}
