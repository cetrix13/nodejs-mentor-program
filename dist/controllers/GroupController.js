const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const Group_1 = __importDefault(require('../models/Group'));
const UserGroup_1 = __importDefault(require('../models/UserGroup'));
const GroupDto_1 = __importDefault(require('../models/GroupDto'));
const GroupService_1 = __importDefault(require('../services/GroupService'));
const UserGroupService_1 = __importDefault(require('../services/UserGroupService'));
class GroupController {
    constructor() {
        this.groupService = new GroupService_1.default(Group_1.default);
        this.userGroupService = new UserGroupService_1.default(UserGroup_1.default);
    }
    getAll() {
        return async (_req, res) => {
            const groups = await this.groupService.getAllGroups();
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
            const group = new GroupDto_1.default(id, name, permissions);
            const result = await this.groupService.createGroup(group);
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
            const group = await this.groupService.getGroupById(parseInt(id, 10));
            if (group && group.length) {
                res.status(200).send(group);
            } else {
                res.sendStatus(404);
            }
        };
    }
    update() {
        return async (req, res) => {
            const { params: { id } } = req;
            const result = await this.groupService.updateGroup(id, req.body);
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
            const result = await Promise.all([this.groupService.deleteGroup(id), this.userGroupService.deleteGroup(id)])
                .then(value => value);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
    addUsersToGroup() {
        return async (req, res) => {
            const { params: { id } } = req;
            const { userIds } = req.body;
            const result = await this.userGroupService.addUsersToGroup(id, userIds);
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
