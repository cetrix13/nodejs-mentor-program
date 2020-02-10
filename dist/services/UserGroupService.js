const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Service_1 = __importDefault(require('./Service'));
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
}
exports.default = UserGroupService;
// # sourceMappingURL=UserGroupService.js.map
