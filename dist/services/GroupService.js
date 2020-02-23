const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Service_1 = __importDefault(require('./Service'));
const Logger_1 = __importDefault(require('../loggers/Logger'));
class GroupService extends Service_1.default {
    constructor(groupModel) {
        super(groupModel);
    }
    getAllGroups() {
        return this.model.findAll()
            .catch(err => Logger_1.default.error(err.message));
    }
    getGroupById(id) {
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
exports.default = GroupService;
// # sourceMappingURL=GroupService.js.map
