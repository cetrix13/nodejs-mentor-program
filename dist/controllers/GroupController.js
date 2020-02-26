const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Group_1 = __importDefault(require('../models/Group'));
const UserGroup_1 = __importDefault(require('../models/UserGroup'));
const GroupDto_1 = __importDefault(require('../models/GroupDto'));
const GroupService_1 = __importDefault(require('../services/GroupService'));
const UserGroupService_1 = __importDefault(require('../services/UserGroupService'));
const Logger_1 = __importDefault(require('../loggers/Logger'));
class GroupController {
    constructor() {
        this.groupService = new GroupService_1.default(Group_1.default);
        this.userGroupService = new UserGroupService_1.default(UserGroup_1.default);
    }
    getAll() {
        return async (req, res) => {
            const { url, method } = req;
            const groups = await this.groupService.getAllGroups()
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method });
                });
            if (groups) {
                res.status(200).send(groups);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req, res) => {
            const { id, name, permissions } = req.body;
            const { url, params, method, body } = req;
            const group = new GroupDto_1.default(id, name, permissions);
            const result = await this.groupService.createGroup(group)
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method, params, body });
                });
            if (result) {
                res.status(200).send(group);
            } else {
                res.sendStatus(500);
            }
        };
    }
    getById() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method } = req;
            const group = await this.groupService.getGroupById(parseInt(id, 10))
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method, params });
                });
            if (group === undefined) {
                res.sendStatus(500);
            } else if (group !== null) {
                res.status(200).send(group);
            } else {
                res.sendStatus(404);
            }
        };
    }
    update() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method, body } = req;
            const result = await this.groupService.updateGroup(id, req.body)
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method, params, body });
                });
            if (result) {
                res.status(200).send(result);
            } else {
                res.sendStatus(500);
            }
        };
    }
    delete() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { url, params, method } = req;
            const result = await Promise.all([this.groupService.deleteGroup(id), this.userGroupService.deleteGroup(id)])
                .then(value => value)
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method, params });
                });
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
    addUsersToGroup() {
        return async (req, res) => {
            const { params: { id }, method, body, url } = req;
            const { userIds } = req.body;
            const result = await this.userGroupService.addUsersToGroup(id, userIds)
                .catch(err => {
                    Logger_1.default.error(err.message, { url, method, body });
                });
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
exports.default = GroupController;
// # sourceMappingURL=GroupController.js.map
