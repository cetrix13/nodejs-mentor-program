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
            .catch(err => logger.error(err.message));
    }

    getById(id: number) {
        return this.model.findAll({ where: { id } })
            .catch(err => logger.error(err.message));
    }

    create(entity): object {
        return this.model.create(entity)
            .catch(err => logger.error(err.message));
    }

    update(id, fields) {
        return this.model.update(fields, { where: { id } })
            .catch(err => logger.error(err.message));
    }

    delete(id) {
        return this.model.destroy({ where: { id } })
            .catch(err => logger.error(err.message));
    }
}
