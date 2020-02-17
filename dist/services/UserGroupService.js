const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Service_1 = __importDefault(require('./Service'));
const connect_1 = __importDefault(require('../config/connect'));
class UserGroupService extends Service_1.default {
    constructor(userGroupModel) {
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
    async addUsersToGroup(groupId, userIds) {
        const transactionsArray = [];
        try {
            for (let i = 0; i < userIds.length; i++) {
                const t = await connect_1.default.transaction();
                transactionsArray.push(t);
                await this.model.create({ group_id: groupId, user_id: userIds[i] }, { transaction: t })
                    .catch(err => console.error(err));
                await t.commit();
            }
        } catch (error) {
            transactionsArray.forEach(async (transaction) => {
                await transaction.rollback();
            });
            return 0;
        }
        return 1;
    }
}
exports.default = UserGroupService;
// # sourceMappingURL=UserGroupService.js.map
