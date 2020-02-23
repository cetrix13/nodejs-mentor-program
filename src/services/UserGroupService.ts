import UserGroupModel from '../models/UserGroup';
import Service from './Service';
import SequelizeInstance from '../config/connect';
import logger from '../loggers/Logger';

export default class UserGroupService extends Service {

    constructor(userGroupModel: typeof UserGroupModel) {
        super(userGroupModel);
    }

    deleteGroup(groupId) {
        return this.model.destroy({ where: { group_id: groupId } })
            .catch(err => logger.error(err.message));
    }
    deleteUser(userId) {
        return this.model.destroy({ where: { user_id: userId } })
            .catch(err => logger.error(err.message));
    }

    async addUsersToGroup(groupId, userIds) {
        let transactionsArray = [];
        try {
            for (let i = 0; i < userIds.length; i++) {
                const t = await SequelizeInstance.transaction();
                transactionsArray.push(t);
                await this.model.create({ group_id: groupId, user_id: userIds[i] }, { transaction: t })
                    .catch(err => logger.error(err.message));
                await t.commit();
            }
        } catch (error) {
            transactionsArray.forEach(async function(transaction) { await transaction.rollback() });
            return 0;
        }
        return 1;
    }
}
