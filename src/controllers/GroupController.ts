import { Request, Response } from 'express';
import GroupModel from '../models/Group';
import GroupDto from '../models/GroupDto';
import GroupService from '../services/GroupService';

export default class GroupController {
    private groupService: GroupService;

    constructor() {
        this.groupService = new GroupService(GroupModel);
    }
    getAll() {
        return async (_req: Request, res: Response) => {
            const groups = await this.groupService.getAllGroups();
            if (groups && groups.length) {
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
            const result = await this.groupService.deleteGroup(id);
            if (result) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        };
    }
}
