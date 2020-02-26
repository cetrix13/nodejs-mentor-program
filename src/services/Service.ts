import { Model, BuildOptions } from 'sequelize/types';
import logger from '../loggers/Logger';

type ServiceModel = typeof Model & {
    new(values?: object, options?: BuildOptions);
}
export default class Service {
    protected model: ServiceModel;

    constructor(model: ServiceModel) {
        this.model = model;
    }
    getAll() {
        return this.model.findAll({ where: { isDeleted: false } })
    }

    getById(id: number) {
        return this.model.findOne({ where: { id } })
    }

    create(entity) {
        return this.model.create(entity)
    }

    update(id, fields) {
        return this.model.update(fields, { where: { id } })
    }

    delete(id) {
        return this.model.destroy({ where: { id } })
    }
}
