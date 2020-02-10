import { Model, BuildOptions } from 'sequelize/types';

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
            .catch(err => console.error(err));
    }

    getById(id: number) {
        return this.model.findAll({ where: { id } })
            .catch(err => console.error(err));
    }

    create(entity): object {
        return this.model.create(entity)
            .catch(err => console.error(err));
    }

    update(id, fields) {
        return this.model.update(fields, { where: { id } })
            .catch(err => console.error(err));
    }

    delete(id) {
        return this.model.destroy({ where: { id } })
            .catch(err => console.error(err));
    }
}
