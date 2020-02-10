import { Request, Response } from 'express';
import GroupModel from '../models/Group';
import UserGroupModel from '../models/UserGroup';
import GroupDto from '../models/GroupDto';
import GroupService from '../services/GroupService';
import UserGroupService from '../services/UserGroupService';

export default class GroupController {
    private groupService: GroupService;
    private userGroupService: UserGroupService;

    constructor() {
        this.groupService = new GroupService(GroupModel);
        this.userGroupService = new UserGroupService(UserGroupModel);
    }
    getAll() {
        return async (_req: Request, res: Response) => {
            const groups = await this.groupService.getAllGroups();
            if (groups) {
                res.status(200).send(groups);
            } else {
                res.sendStatus(500);
            }
        };
    }
    create() {
        return async (req: Request, res: Response) => {
            const { id, name, permissions } = req.body;
            const group = new GroupDto(id, name, permissions);
            const result = await this.groupService.createGroup(group);
            if (result) {
                res.status(200).send(group);
            } else {
                res.sendStatus(500);
            }
        };
    }
    getById() {
        return async (req: Request, res: Response) => {
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
        return async (req: Request, res: Response) => {
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
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const result = await Promise.all([ this.groupService.deleteGroup(id), this.userGroupService.deleteGroup(id) ])
                .then(value => value);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
