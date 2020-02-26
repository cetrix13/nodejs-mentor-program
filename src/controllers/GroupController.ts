import { Request, Response } from 'express';
import GroupModel from '../models/Group';
import UserGroupModel from '../models/UserGroup';
import GroupDto from '../models/GroupDto';
import GroupService from '../services/GroupService';
import UserGroupService from '../services/UserGroupService';
import logger from '../loggers/Logger';

export default class GroupController {
    private groupService: GroupService;
    private userGroupService: UserGroupService;

    constructor() {
        this.groupService = new GroupService(GroupModel);
        this.userGroupService = new UserGroupService(UserGroupModel);
    }
    getAll() {
        return async (req: Request, res: Response) => {
            const { url, method } = req;

            const groups = await this.groupService.getAllGroups()
                .catch(err => { logger.error(err.message, { url, method }) });

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
            const { url, params, method, body } = req;

            const group = new GroupDto(id, name, permissions);
            const result = await this.groupService.createGroup(group)
                .catch(err => { logger.error(err.message, { url, method, params, body }) });

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
            const { url, params, method } = req;

            const group = await this.groupService.getGroupById(parseInt(id, 10))
                .catch(err => { logger.error(err.message, { url, method, params }) });

            if (group === undefined) {
                res.sendStatus(500);
            } else {
                if (group !== null) {
                    res.status(200).send(group);
                } else {
                    res.sendStatus(404);
                }
            }
        };
    }
    update() {
        return async (req: Request, res: Response) => {
            const { params: { id } } = req;
            const { url, params, method, body } = req;

            const result = await this.groupService.updateGroup(id, req.body)
                .catch(err => { logger.error(err.message, { url, method, params, body }) });

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
            const { url, params, method } = req;

            const result = await Promise.all([ this.groupService.deleteGroup(id), this.userGroupService.deleteGroup(id) ])
                .then(value => value)
                .catch(err => { logger.error(err.message, { url, method, params }) });

            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
    addUsersToGroup() {
        return async (req: Request, res: Response) => {
            const { params: { id }, method, body, url } = req;
            const { userIds } = req.body;
            const result = await this.userGroupService.addUsersToGroup(id, userIds)
                .catch(err => { logger.error(err.message, { url, method, body }) });

            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        }
    }
}
